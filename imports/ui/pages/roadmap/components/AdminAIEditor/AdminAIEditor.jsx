import { Button, Flex, Heading, Textarea } from '@chakra-ui/react';
import { CKEditor, CKEditorContext } from '@ckeditor/ckeditor5-react';
import { FiEdit } from '@react-icons/all-files/fi/FiEdit';
import { ImCancelCircle } from '@react-icons/all-files/im/ImCancelCircle';
import { RiSave3Fill } from '@react-icons/all-files/ri/RiSave3Fill';
import {
  Bold,
  ClassicEditor,
  Context,
  ContextWatchdog,
  Essentials,
  HtmlEmbed,
  Italic,
  // Markdown,
  Paragraph,
  SourceEditing,
} from 'ckeditor5';
import { marked } from 'marked';
import React, { useState } from 'react';
import { prepareRoadmapToSave } from '../RoadMap/utils';
import { url } from './const';
import {
  fetchData,
  findParentNodeName,
  getLastElement,
  makeDefaultPrompt,
  makePromptFromTemplate,
} from './helpers';
import './styles.css';
import { aiApi } from '/imports/ui/api';
import { usePermissions } from '/imports/ui/hooks/usePermissions';
import { useRoadMapContext } from '/imports/ui/pages/roadmap/RoadMapContext';
import { useRoadmapApi } from '/imports/ui/pages/roadmap/useRoadmapApi';

export const AdminAIEditor = ({
  text,
  nodeId,
  nodeLabel,
  setNodes,
  nodes,
  edges,
}) => {
  const [promtKeyword] = useState(
    `${findParentNodeName(nodes, nodeId, edges)} ${nodeLabel}`,
  );
  const [promt, setPromt] = useState(
    makeDefaultPrompt(nodeLabel, findParentNodeName(nodes, nodeId, edges)),
  );
  const [prevPromt, setPrevPromt] = useState('');
  const [answer, setAnswer] = useState(
    text || '<p>Тут можно будет отредактировать ответ</p>',
  );
  const [pendingAI, setPendingAI] = useState(false);
  const [loadingAITemplate, setLoadingAITemplate] = useState(false);
  const [isTemplateEditing, setIsTemplateEditing] = useState(false);
  const [template, setTemplate] = useState(
    'Я провожу опрос для frontend разработчиков, где они по ключевому слову должны понять знают ли они данную технологию или нет. Для этого мне нужен справочный материал, из которого будет понятно, о чём спрашивают. Помоги мне создать такой. Ключевое слово "parentNodeLabel nodeLabel". В моём опросе контент будет хорошо выглядеть, если дать краткое определение одним параграфом, дальше дать 2-4 примера, и в конце дать перечисление связанных ключевых терминов.',
  );
  // const [editor, setEditor] = React.useState(null);
  const { roadmap } = useRoadMapContext();
  const { update, isLoading } = useRoadmapApi();
  const { isAdmin } = usePermissions();
  if (!isAdmin) {
    return <div>You are not an admin</div>;
  }
  const handleAsk = async () => {
    setPendingAI(true);
    try {
      const data = await fetchData(promt, url);
      if (data.candidates[0]?.content?.parts[0]?.text) {
        setAnswer(marked(data.candidates[0]?.content?.parts[0]?.text));
      }
    } catch (e) {
      console.error(e);
    }
    setPendingAI(false);
  };
  const handleSave = async () => {
    const newNodes = roadmap.flowData.nodes.map((node) => {
      if (node.id === nodeId) {
        node.data = { ...node.data, text: answer };
      }
      return node;
    });
    const newFlowData = { ...roadmap.flowData, nodes: newNodes };
    const prepared = prepareRoadmapToSave(newFlowData);
    await update(roadmap.id, prepared);
    setNodes(newNodes);
  };
  const handleEditTemplate = () => {
    setIsTemplateEditing(true);
    setPrevPromt(promt);
    setPromt(template);
  };
  const handleCancelEditTemplate = () => {
    setIsTemplateEditing(false);
    setPromt(prevPromt);
  };
  const handleSaveTemplate = async () => {
    try {
      await aiApi.addTemplate(promt);
      setTemplate(promt);
      setPromt(
        makePromptFromTemplate(
          promt,
          nodeLabel,
          findParentNodeName(nodes, nodeId, edges),
        ),
      );
    } catch (e) {
      console.error(e);
    }
    setIsTemplateEditing(false);
  };
  const getData = async () => {
    try {
      setLoadingAITemplate(true);
      const serverTemplates = getLastElement(await aiApi.getTemplate());
      console.log(serverTemplates);
      if (!serverTemplates) {
        await aiApi.addTemplate(template);
      } else {
        setTemplate(serverTemplates.template);
        setPromt(
          makePromptFromTemplate(
            serverTemplates.template,
            nodeLabel,
            findParentNodeName(nodes, nodeId, edges),
          ),
        );
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoadingAITemplate(false);
    }
  };
  // const { updateTask, isLoading: isUpdatingStatusTask } = useUserProgressApi();
  // const { roadmap, getRoadmap } = useRoadMapContext();
  // const { data, isLoading: isLoadingContent } = useContent({ id: node.id });
  // const currentStatus = roadmap.rawScheme?.skills?.[node.id]?.status;
  React.useEffect(() => {
    console.log('load template');
    getData();
  }, []);
  return (
    <div className="admin-ai-editor">
      <CKEditorContext
        context={Context}
        contextWatchdog={ContextWatchdog}
        onChangeInitializedEditors={(editors) => {
          // console.info(
          //   editors.editor1?.instance,
          //   editors.editor1?.yourAdditionalData,
          // );
        }}
      >
        <Heading mb={1}>Admin Panel</Heading>
        <p>Promt IN (keyword: {promtKeyword})</p>
        <Flex gap={8}>
          <Textarea
            placeholder="Enter your promt"
            value={promt}
            onInput={(ev) => {
              setPromt(ev.target.value);
            }}
            autoFocus
            onSubmit={handleAsk}
            style={{ minHeight: '200px' }}
          />
          <div
            className="wrapper"
            style={{ display: 'flex', gap: 8, flexDirection: 'column' }}
          >
            {!isTemplateEditing && (
              <Button loadingText="Asking..." onClick={handleAsk}>
                {pendingAI ? 'Asking...' : 'Ask'}
              </Button>
            )}
            {!isTemplateEditing && (
              <Button
                onClick={handleEditTemplate}
                leftIcon={<FiEdit />}
              ></Button>
            )}
            {isTemplateEditing && (
              <Button
                onClick={handleSaveTemplate}
                leftIcon={<RiSave3Fill />}
              ></Button>
            )}
            {isTemplateEditing && (
              <Button
                onClick={handleCancelEditTemplate}
                leftIcon={<ImCancelCircle />}
              ></Button>
            )}
          </div>
        </Flex>
        <p>Promt OUT</p>
        <CKEditor
          editor={ClassicEditor}
          config={{
            plugins: [
              Essentials,
              Bold,
              Italic,
              Paragraph,
              // Markdown,
              HtmlEmbed,
              SourceEditing,
            ],
            toolbar: [
              'undo',
              'redo',
              '|',
              'bold',
              'italic',
              'paragraph',
              'htmlEmbed',
              'sourceEditing',
            ],
            output: 'html',
            fullPage: true,
          }}
          data={answer}
          contextItemMetadata={{
            name: 'editor1',
            yourAdditionalData: 2,
          }}
          // onReady={(editor) => {
          //   setEditor(editor);
          // }}
          onChange={(_, editor) => {
            setAnswer(marked(editor.getData()));
          }}
        />
        <Button
          // loading={isLoading.toString()}
          loadingText="Saving..."
          onClick={handleSave}
        >
          {isLoading ? 'Saving...' : 'Save'}
        </Button>
      </CKEditorContext>
    </div>
  );
};
