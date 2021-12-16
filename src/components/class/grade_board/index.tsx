import GradeBoardFirstColumnHeader from "./GradeBoardFirstColumnHeader";
import GradeBoardGradeCell from "./GradeBoardGradeCell";
import GradeBoardColumnHeader from "./GradeBoardColumnHeader";
import GradeBoardRow from "./GradeBoardRow";
import GradeBoardRowHeader from "./GradeBoardRowHeader";
import "./index.css";

export default function GradeBoard() {
  return (
    <table className="grade-board_table">
      <thead>
        <GradeBoardRow>
          <GradeBoardFirstColumnHeader />
          <GradeBoardColumnHeader
            gradeStructure={{
              title: "BT Test",
              detail: "4",
            }}
          />
          <GradeBoardColumnHeader
            gradeStructure={{
              title: "Lorem ipsum dolor abcdefgh",
              detail: "4",
            }}
          />
          <GradeBoardColumnHeader
            gradeStructure={{
              title: "Lorem ipsum dolor abcdefgh",
              detail: "4",
            }}
          />
          <GradeBoardColumnHeader
            gradeStructure={{
              title: "Lorem ipsum dolor abcdefgh",
              detail: "4",
            }}
          />
          <GradeBoardColumnHeader
            gradeStructure={{
              title: "Lorem ipsum dolor abcdefgh",
              detail: "4",
            }}
          />
          <GradeBoardColumnHeader
            gradeStructure={{
              title: "Lorem ipsum dolor abcdefgh",
              detail: "4",
            }}
          />

          <th className="grade-board_dummy-column-header">
            <div></div>
          </th>
        </GradeBoardRow>
      </thead>
      <tbody>
        <GradeBoardRow>
          <GradeBoardRowHeader />
          <GradeBoardGradeCell readOnly />
          <GradeBoardGradeCell readOnly />
          <td className="grade-board_dummy-cell"></td>
        </GradeBoardRow>

        <GradeBoardRow>
          <GradeBoardRowHeader
            studentInformation={{
              name: "Test",
              studentId: "1",
            }}
          />
          <GradeBoardGradeCell />
          <GradeBoardGradeCell />
          <td className="grade-board_dummy-cell"></td>
        </GradeBoardRow>
        <GradeBoardRow>
          <GradeBoardRowHeader
            studentInformation={{
              name: "Test",
              studentId: "1",
            }}
          />
          <GradeBoardGradeCell />
          <GradeBoardGradeCell />
          <td className="grade-board_dummy-cell"></td>
        </GradeBoardRow>
      </tbody>
    </table>
  );
}
