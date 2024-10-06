import React from 'react';

import classes from './styles.module.scss';
import { Button, Textarea, useDisclosure } from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from '@chakra-ui/react';
interface Props {}

export const ImportRoadmap = ({ onCreate }: React.PropsWithChildren<Props>) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [value, setValue] = React.useState(VALUE);

  const onSaveRoadmap = () => {
    onCreate(value);
    onClose();
  };

  return (
    <div style={{ position: 'absolute', top: 80 }}>
      <Button
        variant={'solid'}
        onClick={onOpen}
        leftIcon={<AddIcon />}
        size={'sm'}
        colorScheme="green"
      >
        Создать roadmap
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Generate Roadmap from text</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Textarea
              style={{ height: 400 }}
              placeholder={PLACEHOLDER_TEXT}
              value={value}
              onChange={(e) => setValue(e.target.value)}
            ></Textarea>
          </ModalBody>

          <ModalFooter>
            <Button
              variant="solid"
              colorScheme={'green'}
              onClick={onSaveRoadmap}
            >
              Создать
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
};

const PLACEHOLDER_TEXT =
  '## Parent Topic\n' +
  '- Subtopic 1\n' +
  '- Subtopic 2\n' +
  '## Another Topic\n' +
  '- Subtopic 1\n' +
  '- Subtopic 2\n' +
  '- Subtopic 3\n' +
  '## Another Topic\n' +
  '- Subtopic 3\n' +
  '- Subtopic 3\n' +
  '- Subtopic 3\n' +
  '## Another Topic\n' +
  '- Topics can be without \n' +
  '## Another Topic\n' +
  '## Another Topic\n';

const VALUE = `## Блок
## Группа
- Уровень | Навык
## Базовый HTML
- Base | Структура документа
- Base | Семантика HTML
## Методанные
- Base | Метаданные
## HTML
- Base | Атрибуты
- Base | Таблицы
- Base | Формы
## Медиа
- Base | Изображения
## Доступность Элементов
- Base | Доступность элементов
## CSS селекторы
- Base | Селекторы
- Base | Наследование
## CSS
- Base | Единицы измерения размеров
- Base | Анимации
- Base | Z-индекс и позиционирование
- Base | Repain/Reflow
## Скелет
- Base | Сетка
- Base | Grid
- Base | Flex
## Отзывчивый дизайн
- Base, Advanced | Отзывчивый Дизайн
## CSS/HTML
## Базовый HTML
- Base | Структура документа
- Base | Семантика HTML
## Методанные
- Base | Метаданные
## HTML
- Base | Атрибуты
- Base | Таблицы
- Base | Формы
## Медиа
- Base | Изображения
## Доступность Элементов
- Base | Доступность элементов
## CSS селекторы
- Base | Селекторы
- Base | Наследование
## CSS
- Base | Единицы измерения размеров
- Base | Анимации
- Base | Z-индекс и позиционирование
- Base | Repain/Reflow
## Скелет
- Base | Сетка
- Base | Grid
- Base | Flex
## Отзывчивый дизайн
- Base, Advanced | Отзывчивый Дизайн
## JavaScript
## Переменные
- Base | Var, Let, Const
## Область видимости
- Base | Поднятие
- Base | Глобальная видимость
- Base | Блочная видимость
- Base | Функциональная видимость
## Типы
- Base | Примитивы
## Типы/Объекты
- Base | Объекты
- Base | Прототипное наследование
- Base | Преобразование типов
## Структура Данных
- Base | Структура данных
- Base | Коллекции с ключами
- Base | JSON
- Base | Массив
- Base | Типизированный массив
## Map/Set
- Base | Map, Set
- Base | WeakMap, WeakSet
## События
- Base | Event
## Операторы сравнения
- Base | Операторы == и ===
- Base | Оператор Objest.is
## Интерации и циклы
- Base | for, while, do while
- Base | break/continue, for... of, for... in
## Контроль состояний
- Base | if... else, switch
- Base | Инструкция throw
- Base | try/catch/finnaly
## Выражения и операторы
- Base | Тернарный оператор ?:
- Base | Оператор typeof
- Expert | Приоритет операторов
- Base | Оператор расширения
## Виды операторов
- Base | Арифметические операторы
- Base | Битовые (поразрядные) операторы
- Base | Логические операторы
- Base | Строковые операторы
## Функция
- Base | Параметры функции
- Base | Стрелочная функция
- Base | IIFE
- Base | Стек вызовов
## Лексическое окружение
- Base | Рекурсия
- Base | Лексическое окружение
- Base | Замыкание
## this
- Base | call, apply, bind
- Base | this в методах и функция
- Base | this в обработчиках событий
- Base | this в стрелочной функции
## Асинхронный JS
- Base | Callback
- Base | SetTimeout, SetInterval
- Base | EventLoop
## Promise
- Base | Promise
- Base | async/await
## Работа запросами
- Base | XHR
- Base | Fetch
- Base | Socket
## TypeScript
## Типы
- Base | Объекты типов: enum, interface, class, array
- Base | Утверждения типов as [type]
## Не определенные
- Base | any, unknow, never
## Защита типов
- Base | instanceof, typeof
- Base | Операторы сравнения switch, if/else
## Функции
- Base | Типизация функции
- Base | Перезагрузка функции
## Generic
- Base | Обобщенные типы <T>
- Base | Наследование (ограничение)
## Утилиты
- Base | Объектные: Partial, Required, Readonly, Record, Pick, Omit
- Base | Объеденяющие: Exclude, Extract, NonNullable 
- Base | Функциональные: Parameters, ReturnType
## React
## Компоненты
- Base | Функциональный компонент
- Base | JSX
- Base | Props и State
- Base | Отрисовка состояний
- Base | Составление композиций
## Отрисовка
- Base | Жизненный цикл компонента
- Base | Списки и ключи
- Base | Передача props
- Base | Обработка событий
## Refs
- Base | Refs
- Base | Хранение между рендерами
## Паттерны
- Base | HOC
- Base | Композиция
## Hooks
- Base | Базовые: useState, useEffect
- Base | Дополнительные: useMemo, useRef, useCallback, useContext, useReduce
- Base | Собственные (самописные)
## Routers
- Base | React Router
- Base | Tanstak
## Управление состоянием
- Base | Redux ToolKit
- Base | MobX
- Base | Context
## Работа с CSS
- Base | CSS Module
- Base | Tailwind CSS
## Библиотека компонентов
- Base | Библиотеки компонентов: Material UI, Chakra UI, Ant e.t.c
## Работа с запросами
- Base | Axios
- Base | RTK-query
- Base | react-query
- Base | Apollo
- Base | Relay
## Формы
- Base | React Hook Form
- Base | Formik
## Тесты
- Base | Cypress
- Base | Playwright`;
