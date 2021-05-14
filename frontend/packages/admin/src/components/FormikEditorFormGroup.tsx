//@ts-nocheck

import React from "react";
import lodash from "lodash";
import { Editor } from "react-draft-wysiwyg";
import styled from "styled-components";
import Draft, {
  EditorState,
  convertToRaw,
  ContentState,
  convertFromRaw,
} from "draft-js";

import draftToHtml from "draftjs-to-html";
import htmlToDraft from "html-to-draftjs";

import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

import { Colors, FormGroup } from "@dontloop/admin-ui";
import { ChevronDown, ChevronUp } from "react-feather";

const Wrapper = styled.div`
  img {
    max-width: 100%;
  }
  position: relative;
  .floating {
    position: absolute;
    right: 2rem;
    bottom: 2rem;
    display: flex;
    flex-direction: column;
    z-index: 333;
    svg {
      cursor: pointer;
      &:hover {
        color: #0a66b7;
      }
    }
  }
`;

interface IFormikEditorFormGroupProps {
  required?: boolean;
  fm: any;
  name: string;
  label: string;
  height?: number;
  renderKey?: string;
  onNewBodyChanged?: any;
}

const toBase64 = (file): Promise<string | ArrayBuffer | null> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

const FormikEditorFormGroup: React.FunctionComponent<IFormikEditorFormGroupProps> = ({
  fm,
  name,
  label,
  required,
  renderKey,
  onNewBodyChanged,
  ...props
}) => {
  const [height, setHeight] = React.useState(400);

  /**
   * State which hold the draftjs state
   */
  const [editorState, setEditorState] = React.useState(() =>
    EditorState.createEmpty()
  );

  /**
   * When component received new props
   */
  React.useEffect(() => {
    setEditorState((editorState) => {
      const currentContent = draftToHtml(
        convertToRaw(editorState.getCurrentContent())
      );

      if (currentContent !== fm.values[name]) {
        const { contentBlocks, entityMap } = htmlToDraft(fm.values[name] || "");
        const nextContentState = ContentState.createFromBlockArray(
          contentBlocks,
          entityMap
        );
        return EditorState.createWithContent(nextContentState);
      }

      return editorState;
    });
  }, [renderKey, fm.values[name]]);

  /**
   * Handling editor state change
   * @param state : new state
   */
  const onEditorStateChanged = (state) => {
    setEditorState(state);
  };

  /**
   * Saving new data to formik whenever state change
   */
  React.useEffect(() => {
    const content = editorState.getCurrentContent();
    const rawContent = convertToRaw(content);
    const html = draftToHtml(rawContent);
    if (html !== fm.values[name]) {
      if (onNewBodyChanged) onNewBodyChanged(html);
    }
  }, [editorState]);

  /**
   * Handling update image
   * @param file
   */
  const uploadCallback = (file) => {
    return new Promise(async (resolve, reject) => {
      const data = await toBase64(file);
      Image.create([data])
        .then((data) => {
          const link = data[0]?.originalUrl;
          return resolve({ data: { link } });
        })
        .catch(reject);
    });
  };

  function changeHeight(value) {
    return function () {
      setHeight((height) => {
        if (height + value < 400) return height;
        return height + value;
      });
    };
  }

  return (
    <Wrapper>
      <FormGroup
        label={label}
        error={fm.errors[name]}
        touched={fm.touched[name]}
        required={required}
      >
        <Editor
          editorState={editorState}
          onEditorStateChange={onEditorStateChanged}
          editorStyle={{
            height: `${height}px`,
            padding: "0 2rem",
            backgroundColor: `${Colors.White}`,
          }}
          wrapperStyle={{ border: `1px solid ${Colors.BorderColor}` }}
          toolbar={{
            image: {
              uploadEnabled: true,
              uploadCallback,
              previewImage: true,
              inputAccept: "image/gif,image/jpeg,image/jpg,image/png,image/svg",
              alt: { present: false, mandatory: false },
              defaultSize: {
                height: "auto",
                width: "auto",
              },
            },
          }}
        />
      </FormGroup>
      <div className="floating">
        <ChevronUp onClick={changeHeight(-100)} />
        <ChevronDown onClick={changeHeight(100)} />
      </div>
    </Wrapper>
  );
};

// export default FormikEditorFormGroup;

export default React.memo(FormikEditorFormGroup, (prevProps, nextProps) => {
  const { name } = prevProps;
  const shouldRender =
    lodash.isEqual(prevProps.fm.values[name], nextProps.fm.values[name]) &&
    lodash.isEqual(prevProps.fm.errors[name], nextProps.fm.errors[name]) &&
    lodash.isEqual(prevProps.fm.touched[name], nextProps.fm.touched[name]);
  return shouldRender;
});
