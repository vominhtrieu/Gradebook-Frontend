import React, { ChangeEvent, useContext, useRef, useState } from "react";
import { putData } from "../../../handlers/api";
import { message } from "antd";
import { MainContext } from "../../../contexts/main";

interface InputProps extends React.HTMLProps<HTMLInputElement> {
    classId?: number;
    gradeStructureId?: number;
    studentId?: string;
    maximumGrade?: number;
}

export default function GradeBoardGradeCell({
                                                classId,
                                                gradeStructureId,
                                                studentId,
                                                maximumGrade,
                                                ...props
                                            }: InputProps) {
    const inputRef = useRef<HTMLInputElement>(null);
    const [grade, setGrade] = useState<string>(
        props.value ? props.value.toString() : ""
    );
    const [focusInput, setFocusInput] = useState<boolean>(false);
    const [metaDataWrapperState, setMetadataWrapperState] = useState<string>(
        props.value ? " containing" : ""
    );
    const [isSaving, setIsSaving] = useState<boolean>(false);
    const mainContext = useContext(MainContext);

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
                mainContext.setReloadNeeded(true);
                setIsSaving(false);
            })
            .catch(() => {
                setIsSaving(false);
                return message.error("Can't save grade");
            });
    };

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        // @ts-ignore
        if (isNaN(Number(e.target.value)) || (parseFloat(grade) > maximumGrade || parseFloat(grade) < 0)) {
            setIsSaving(false);
            return message.error("Invalid grade");
        } else {
            setGrade(e.target.value);
        }
    }

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
                                onChange={e => handleInputChange(e)}
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
