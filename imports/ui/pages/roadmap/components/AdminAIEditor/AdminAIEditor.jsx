import { Button, Flex, Heading, Input } from '@chakra-ui/react';
import { CKEditor, CKEditorContext } from '@ckeditor/ckeditor5-react';
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
import { fetchData, findParentNodeName, makeDefaultPrompt } from './helpers';
import './styles.css';
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
  const [answer, setAnswer] = useState(
    text || '<p>Тут можно будет отредактировать ответ</p>',
  );
  const [pendingAI, setPendingAI] = useState(false);
  // const [editor, setEditor] = React.useState(null);
  const { roadmap } = useRoadMapContext();
  const { update, isLoading } = useRoadmapApi();
  const { isAdmin } = usePermissions();
  if (!isAdmin) {
    return <div>You are not an admin</div>;
  }
  const handleAsk = async () => {
    setPendingAI(true);
    const data = await fetchData(promt, url);
    if (data.candidates[0]?.content?.parts[0]?.text) {
      setAnswer(marked(data.candidates[0]?.content?.parts[0]?.text));
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
  // const { updateTask, isLoading: isUpdatingStatusTask } = useUserProgressApi();
  // const { roadmap, getRoadmap } = useRoadMapContext();
  // const { data, isLoading: isLoadingContent } = useContent({ id: node.id });
  // const currentStatus = roadmap.rawScheme?.skills?.[node.id]?.status;

  return (
    <div className="admin-ai-editor">
      <CKEditorContext
        context={Context}
        contextWatchdog={ContextWatchdog}
        onChangeInitializedEditors={(editors) => {
          console.info(
            editors.editor1?.instance,
            editors.editor1?.yourAdditionalData,
          );
        }}
      >
        <Heading mb={1}>Admin Panel</Heading>
        <p>Promt IN (keyword: {promtKeyword})</p>
        <Flex gap={8}>
          <Input
            placeholder="Enter your promt"
            value={promt}
            onInput={(ev) => {
              setPromt(ev.target.value);
            }}
            autoFocus
            onSubmit={handleAsk}
          />
          <Button
            // loading={pendingAI}
            loadingText="Asking..."
            onClick={handleAsk}
          >
            {pendingAI ? 'Asking...' : 'Ask'}
          </Button>
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
