import Checkbox from "antd/lib/checkbox/Checkbox";
import React, { useEffect, useRef, useState } from "react";
import { putData } from "../../../handlers/api";
import { message } from "antd";

interface InputProps extends React.HTMLProps<HTMLInputElement> {
  classId?: number;
  gradeStructureId?: number;
  studentId?: string;
}

export default function GradeBoardGradeCell({
  classId,
  gradeStructureId,
  studentId,
  ...props
}: InputProps) {
  const maximumGrade = 100;
  const inputRef = useRef<HTMLInputElement>(null);
  const [grade, setGrade] = useState<string>(
    props.value ? props.value.toString() : ""
  );
  const [focusInput, setFocusInput] = useState<boolean>(false);
  const [metaDataWrapperState, setMetadataWrapperState] = useState<string>(
    props.value ? " containing" : ""
  );
  const [isSaving, setIsSaving] = useState<boolean>(false);

  const handleOnClickMetadataWrapper = () => {
    setFocusInput(true);
  };

  const handleOnBlurInput = () => {
    setFocusInput(false);
    setIsSaving(true);
    if (grade !== "") {
      setMetadataWrapperState(" containing");
    } else {
      setMetadataWrapperState("");
    }

    putData(`/classrooms/${classId}/grades`, {
      studentId: studentId,
      gradeStructureId: gradeStructureId,
      grade: grade,
    })
      .then(msg => {
        setIsSaving(false);
      })
      .catch(() => {
        setIsSaving(false);
        return message.error("Can't save grade");
      });
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
              <div className="underline" />
            </div>
          ) : (
            <div
              className={`metadata-wrapper${metaDataWrapperState}`}
              onClick={handleOnClickMetadataWrapper}
            >
              {metaDataWrapperState === " containing" ? (
                <>
                  <p className="current-grade">{grade}</p>
                  {isSaving && <p className="current-state">Saving...</p>}
                </>
              ) : (
                <p className="current-grade">____/{maximumGrade}</p>
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
}
