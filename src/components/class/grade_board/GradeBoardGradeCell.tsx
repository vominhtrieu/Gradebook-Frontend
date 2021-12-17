import Checkbox from "antd/lib/checkbox/Checkbox";
import React, { useRef, useState } from "react";

export default function GradeBoardGradeCell({
  ...props
}: React.HTMLProps<HTMLInputElement>) {
  const maximumGrade = 100;
  const inputRef = useRef<HTMLInputElement>(null);
  const [grade, setGrade] = useState<string>(
    props.value ? props.value.toString() : ""
  );
  const [focusInput, setFocusInput] = useState<boolean>(false);
  const [metaDataWrapperState, setMetadataWrapperState] = useState<string>(
    props.value ? " containing" : ""
  );

  const handleOnClickMetadataWrapper = () => {
    setFocusInput(true);
  };

  const handleOnBlurInput = () => {
    setFocusInput(false);

    if (grade !== "") {
      setMetadataWrapperState(" containing");
    } else {
      setMetadataWrapperState("");
    }
  };

  return (
    <div className={`grade-board_grade-cell${focusInput ? " focus" : ""}`}>
      {props.readOnly ? (
        <div className="metadata-wrapper containing">
          <p className="current-grade">{grade}</p>
        </div>
      ) : (
        <>
          {focusInput ? (
            <div className="input-wrapper">
              <input
                {...props}
                ref={inputRef}
                value={grade}
                onChange={e => setGrade(e.target.value)}
                onBlur={handleOnBlurInput}
                autoFocus={focusInput}
              />
              <p>/{maximumGrade}</p>
              <div className="underline"></div>
            </div>
          ) : (
            <div
              className={`metadata-wrapper${metaDataWrapperState}`}
              onClick={handleOnClickMetadataWrapper}
            >
              {metaDataWrapperState === " containing" ? (
                <>
                  <p className="current-grade">
                    {grade}/{maximumGrade}
                  </p>
                  <p className="current-state">Saving...</p>
                </>
              ) : (
                <p className="current-grade">____/{maximumGrade}</p>
              )}
            </div>
          )}

          <Checkbox className="finalization-checkbox" />
        </>
      )}
    </div>
  );
}
