import React, {
  ChangeEvent,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { putData } from "../../../handlers/api";
import { message } from "antd";
import { MainContext } from "../../../contexts/main";

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
  const [gradeStr, setGradeStr] = useState<string>(
    props.value ? props.value.toString() : ""
  );
  const [grade, setGrade] = useState<string>(
    props.value ? props.value.toString() : ""
  );
  const [focusInput, setFocusInput] = useState<boolean>(false);
  const [metaDataWrapperState, setMetadataWrapperState] = useState<string>(
    props.value ? " containing" : ""
  );
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const mainContext = useContext(MainContext);

  useEffect(() => {
    if (grade !== "") {
      setMetadataWrapperState(" containing");
    } else {
      setMetadataWrapperState("");
    }
  }, [grade]);

  const handleOnClickMetadataWrapper = () => {
    setFocusInput(true);
  };

  const handleOnBlurInput = () => {
    setFocusInput(false);

    if (gradeStr === "") {
      setGradeStr(grade);
      return;
    }

    if (
      isNaN(Number(gradeStr)) ||
      parseFloat(gradeStr) > maximumGrade ||
      parseFloat(gradeStr) < 0
    ) {
      setIsSaving(false);
      setGradeStr(grade);
      return message.error("Invalid grade");
    } else {
      if (gradeStr === grade) {
        return;
      }

      setIsSaving(true);

      putData(`/classrooms/${classId}/grades`, {
        studentId: studentId,
        gradeStructureId: gradeStructureId,
        grade: gradeStr,
      })
        .then(msg => {
          setGrade(gradeStr);
          mainContext.setReloadNeeded(true);
          setIsSaving(false);
        })
        .catch(() => {
          setIsSaving(false);
          return message.error("Can't save grade");
        });
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
                value={gradeStr}
                onChange={e => setGradeStr(e.target.value)}
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
                <p className="current-grade">____</p>
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
}
