import React, { useState, useEffect } from "react";
import {
  Box,
  Flex,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  Image,
  ModalCloseButton,
  ModalBody,
} from "@chakra-ui/react";
import { FiPrinter } from "react-icons/fi";
import ReactToPrint from "react-to-print";
import moment from "moment";
import momentkh from "@thyrith/momentkh";
import { getKhmerNumber } from "../function/fn";
import OriginalLogo from "../images/officail_logo.png";
import { useLazyQuery, useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";
//component
import { GET_CLASS_BY_ID } from "../schema/class";
import RowAttendance from "./RowAttendance";

export default function PrintAttendance({
  isOpen,
  onClose,
  printData,
  sectionShift,
  classId,
  daysMonth,
}) {
  console.log("printData::", printData);
  let teacherData = sectionShift?.sections?.filter(
    (e) => e?.subjectId?.subjectName?.trim() === "ភាសាខ្មែរ"
  )[0];
  const [currentMonth, setCurrentMonth] = useState("");
  const [classByIdData, setClassByIdData] = useState(null);
  const [khmerDateString, setKhmerDateString] = useState("");

  //  Print
  const componentRef = React.useRef(null);

  const onBeforeGetContentResolve = React.useRef(null);

  const [loading, setLoading] = React.useState(false);
  const [text, setText] = React.useState("old boring text");

  const handleAfterPrint = React.useCallback(() => {
    console.log("`onAfterPrint` called");
  }, []);

  const handleBeforePrint = React.useCallback(() => {
    console.log("`onBeforePrint` called");
  }, []);

  const handleOnBeforeGetContent = React.useCallback(() => {
    console.log("`onBeforeGetContent` called");
  }, [setLoading, setText]);

  const reactToPrintContent = React.useCallback(() => {
    return componentRef.current;
  }, [componentRef.current]);
  //end print

  //query data
  const [getClassesById, { loading: loadingClassesById }] = useLazyQuery(
    GET_CLASS_BY_ID,
    {
      onCompleted: ({ getClassesById }) => {
        setClassByIdData(getClassesById);
      },
      onError: (error) => {
        console.log(error.message);
      },
      fetchPolicy: "network-only",
    }
  );

  useEffect(() => {
    if (isOpen) {
      getClassesById({
        variables: {
          classId: classId,
        },
      });
    }
  }, [classId, isOpen]);

  //data for print

  useEffect(() => {
    let khMoment = momentkh(moment);
    setKhmerDateString(khMoment()?.toLunarDate("ថ្ងៃW dN ខែm ឆ្នាំa e ព.ស b"));
  }, []);

  let programmName = sectionShift?.programId?.programmName;

  let firstAcademic = getKhmerNumber(
    sectionShift?.academicYearId?.academicYear
  ).slice(0, 4);
  let secondAcademic = getKhmerNumber(
    sectionShift?.academicYearId?.academicYear
  ).slice(4, 8);

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const d = new Date();
  const currMonth = monthNames[d.getMonth()];
  const currentDate = moment();

  useEffect(() => {
    if (currMonth === "January") {
      setCurrentMonth("មករា");
    } else if (currMonth === "February") {
      setCurrentMonth("កុម្ភៈ");
    } else if (currMonth === "March") {
      setCurrentMonth("មិនា");
    } else if (currMonth === "April") {
      setCurrentMonth("មេសា");
    } else if (currMonth === "May") {
      setCurrentMonth("ឧសភា");
    } else if (currMonth === "June") {
      setCurrentMonth("មិថុនា");
    } else if (currMonth === "July") {
      setCurrentMonth("កក្កដា");
    } else if (currMonth === "August") {
      setCurrentMonth("សីហា");
    } else if (currMonth === "September") {
      setCurrentMonth("កញ្ញា");
    } else if (currMonth === "October") {
      setCurrentMonth("តុលា");
    } else if (currMonth === "November") {
      setCurrentMonth("វិច្ឆិកា");
    } else {
      setCurrentMonth("ធ្នូ");
    }
  }, [currMonth]);

  const reactToPrintTrigger = React.useCallback(() => {
    return (
      <div style={{ width: "100%", display: "flex", justifyContent: "right" }}>
        <Button
          style={{
            width: "18%",
            height: "38px",
            padding: "7px",
            backgroundColor: "#008BFF",
            color: "#fff",
          }}
        >
          <div style={{ display: "flex", justifyContent: "center" }}>
            <div style={{ marginTop: "2px" }}>
              <FiPrinter style={{ fontSize: "18px" }} />
            </div>
            <div style={{ marginLeft: "10px" }}>Print</div>
          </div>
        </Button>
      </div>
    );
  }, []);
  // End Print

  return (
    <Modal
      closeOnOverlayClick={true}
      onClose={onClose}
      isOpen={isOpen}
      isCentered
      size={1200}
    >
      <ModalOverlay />
      <ModalContent width="1200px">
        <ModalHeader>Print Schedule</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          <div ref={componentRef}>
            <div class="title-attendance">
              <div class="left-title-attendance">
                <div class="letf-title-container">
                  <div style={{ textAlign: "center" }}>
                    <h3>
                      <Image
                        preview={false}
                        src={OriginalLogo}
                        className="att-logo"
                      />
                    </h3>
                    <div
                      className="top-attendance"
                      style={{
                        fontWeight:
                          programmName === "កម្មវិធីភាសាខ្មែរ" ? "" : "bold",
                      }}
                    >
                      {programmName}
                    </div>
                    <div
                      className="top-attendance"
                      style={{
                        fontWeight:
                          programmName === "កម្មវិធីភាសាខ្មែរ" ? "" : "bold",
                      }}
                    >
                      {classByIdData?.classGroupId?.classGroupName}
                    </div>
                  </div>
                </div>
              </div>
              <div class="center-title-attendance">
                <div class="center-title-container">
                  <div style={{ textAlign: "center" }}>
                    <div
                      style={{ marginTop: "15px" }}
                      className="top-attendance"
                    >
                      ព្រះរាជាណាចក្រកម្ពុជា
                    </div>
                    <div className="top-attendance-en">Kingdom Of Cambodia</div>
                    <div className="top-attendance">
                      ជាតិ សាសនា ព្រះមហាក្សត្រ
                    </div>
                    <div className="top-attendance-en">
                      Nation Religion King
                    </div>
                    <div className="wingding-con">
                      <b>----</b>
                      <span className="wingding">
                        &#157;&#128606;&#128613;&#128612;&#10041;&#128614;&#128615;&#128604;&#128605;
                      </span>
                      <b>----</b>
                    </div>
                    <>
                      {programmName === "កម្មវិធីភាសាខ្មែរ" ? (
                        <div
                          className="top-attendance"
                          style={{ marginTop: "6px" }}
                        >
                          បញ្ជីវត្តមានសិស្សប្រចាំថ្ងៃសម្រាប់ខែ{currentMonth}
                        </div>
                      ) : (
                        <div
                          className="top-attendance"
                          style={{ fontWeight: "bold", marginTop: "6px" }}
                        >
                          Daily Attendance List for {currMonth}
                        </div>
                      )}
                    </>
                    <>
                      {programmName === "កម្មវិធីភាសាខ្មែរ" ? (
                        <div className="top-attendance">
                          {sectionShift?.classId?.gradeId?.gradeName} &quot;
                          {sectionShift?.classId?.className}&quot;{" "}
                          {sectionShift?.sectionTypeId?.sectionTypeName ===
                          "Morning"
                            ? "ពេលព្រឹក"
                            : "ពេលរសៀល"}{" "}
                          បន្ទប់ ៖{" "}
                          {sectionShift?.classroomId?.classroomName
                            ? sectionShift?.classroomId?.classroomName
                            : "គ្មាន"}
                        </div>
                      ) : (
                        <div
                          className="top-attendance"
                          style={{ fontWeight: "bold" }}
                        >
                          {sectionShift?.sectionShiftId?.sectionShiftName},
                          Time: {sectionShift?.sectionTypeId?.sectionTypeName}
                          ,Room:{" "}
                          {sectionShift?.classroomId?.classroomName
                            ? sectionShift?.classroomId?.classroomName
                            : "none"}
                        </div>
                      )}
                    </>
                    <>
                      {programmName === "កម្មវិធីភាសាខ្មែរ" ? (
                        <div className="top-attendance">
                          ឆ្នាំសិក្សា {firstAcademic + "-" + secondAcademic}
                        </div>
                      ) : (
                        <div
                          className="top-attendance"
                          style={{ fontWeight: "bold" }}
                        >
                          Academic Year{" "}
                          {sectionShift?.academicYearId?.academicYear}
                        </div>
                      )}
                    </>
                  </div>
                </div>
              </div>
            </div>
            <table class="attenance-table">
              <tr>
                <th
                  class="no-item"
                  rowSpan="2"
                  style={{
                    fontWeight:
                      programmName === "កម្មវិធីភាសាខ្មែរ" ? "" : "bold",
                  }}
                >
                  {programmName === "កម្មវិធីភាសាខ្មែរ" ? "ល.រ" : "N0"}
                </th>
                <th
                  class="id-item"
                  rowSpan="2"
                  style={{
                    fontWeight:
                      programmName === "កម្មវិធីភាសាខ្មែរ" ? "" : "bold",
                  }}
                >
                  {programmName === "កម្មវិធីភាសាខ្មែរ"
                    ? "អត្តលេខ"
                    : "ID Number"}
                </th>
                <th
                  class="name-item"
                  colSpan="2"
                  style={{
                    fontWeight:
                      programmName === "កម្មវិធីភាសាខ្មែរ" ? "" : "bold",
                  }}
                >
                  {programmName === "កម្មវិធីភាសាខ្មែរ"
                    ? "គោន្តនាម និងនាម"
                    : "Student's Name"}
                </th>
                <th
                  class="gender-item"
                  rowSpan="2"
                  style={{
                    fontWeight:
                      programmName === "កម្មវិធីភាសាខ្មែរ" ? "" : "bold",
                  }}
                >
                  {programmName === "កម្មវិធីភាសាខ្មែរ" ? "ភេទ" : "Gender"}
                </th>
                <th
                  class="date-item"
                  colSpan={
                    daysMonth.length === 31
                      ? "31"
                      : daysMonth.length === 30
                      ? "30"
                      : daysMonth.length === 29
                      ? "29"
                      : "28"
                  }
                  style={{
                    fontWeight:
                      programmName === "កម្មវិធីភាសាខ្មែរ" ? "" : "bold",
                  }}
                >
                  {programmName === "កម្មវិធីភាសាខ្មែរ"
                    ? "កាលបរិច្ឆេទ"
                    : "Date"}
                </th>
                <th
                  class="total-item"
                  colSpan="4"
                  style={{
                    fontWeight:
                      programmName === "កម្មវិធីភាសាខ្មែរ" ? "" : "bold",
                  }}
                >
                  {programmName === "កម្មវិធីភាសាខ្មែរ" ? "សរុប" : "Total"}
                </th>
                <th
                  class="other-item"
                  rowSpan="2"
                  style={{
                    fontWeight:
                      programmName === "កម្មវិធីភាសាខ្មែរ" ? "" : "bold",
                  }}
                >
                  {programmName === "កម្មវិធីភាសាខ្មែរ" ? "ផ្សេងៗ" : "Others"}
                </th>
              </tr>
              <tr>
                <th
                  class="khmer-name-item"
                  style={{
                    fontWeight:
                      programmName === "កម្មវិធីភាសាខ្មែរ" ? "" : "bold",
                  }}
                >
                  {programmName === "កម្មវិធីភាសាខ្មែរ"
                    ? "ឈ្មោះខ្មែរ"
                    : "Khmer"}
                </th>
                <th
                  class="eng-name-item"
                  style={{
                    fontWeight:
                      programmName === "កម្មវិធីភាសាខ្មែរ" ? "" : "bold",
                  }}
                >
                  {programmName === "កម្មវិធីភាសាខ្មែរ"
                    ? "ឈ្មោះឡាតាំង"
                    : "Latin"}
                </th>
                {daysMonth.map((day, index) => (
                  <th class="days-date" key={index}>
                    {day}
                  </th>
                ))}
                <th class="come-status">T</th>
                <th class="late-status">L</th>
                <th class="permission-status">P</th>
                <th class="absence-status">A</th>
              </tr>
              {printData?.map((print, indexKey) => (
                <>
                  <RowAttendance
                    print={print}
                    days={daysMonth}
                    indexKey={indexKey}
                    programmName={programmName}
                  />
                </>
              ))}
            </table>
            <div class="attenance-footer">
              <div class="attenance-footer-left">
                <div
                  class="attenance-footer-left-note"
                  style={{
                    fontWeight:
                      programmName === "កម្មវិធីភាសាខ្មែរ" ? "" : "bold",
                  }}
                >
                  {programmName === "កម្មវិធីភាសាខ្មែរ" ? "សម្គាល់" : "Note"}
                </div>
                <Flex>
                  <Box w="80%" className="attenance-footer-left-status-title">
                    {`1. 1 = ${
                      programmName === "កម្មវិធីភាសាខ្មែរ" ? "វត្តមាន" : "Come"
                    }`}
                  </Box>
                  <Box w="20%">
                    <div class="attenance-footer-left-come-status"></div>
                  </Box>
                </Flex>
                <Flex>
                  <Box w="80%" className="attenance-footer-left-status-title">
                    {`2. L = ${
                      programmName === "កម្មវិធីភាសាខ្មែរ" ? "យឺត" : "Late"
                    }`}
                  </Box>
                  <Box w="20%">
                    <div class="attenance-footer-left-late-status"></div>
                  </Box>
                </Flex>
                <Flex>
                  <Box w="80%" className="attenance-footer-left-status-title">
                    {`3. P = ${
                      programmName === "កម្មវិធីភាសាខ្មែរ"
                        ? "សុំច្បាប់"
                        : "Permission"
                    }`}
                  </Box>
                  <Box w="20%">
                    <div class="attenance-footer-left-permission-status"></div>
                  </Box>
                </Flex>
                <Flex>
                  <Box w="80%" className="attenance-footer-left-status-title">
                    {`4. A = ${
                      programmName === "កម្មវិធីភាសាខ្មែរ"
                        ? "អវត្តមាន"
                        : "Absence"
                    }`}
                  </Box>
                  <Box w="20%">
                    <div class="attenance-footer-left-absent-status"></div>
                  </Box>
                </Flex>
              </div>
              <div class="attenance-footer-center"></div>
              <>
                {programmName === "កម្មវិធីភាសាខ្មែរ" ? (
                  <div class="attenance-footer-right">
                    មតិយោបល់ ៖
                    <span className="attenance-footer-right-item">
                      {printData?.map((d) => (
                        <>
                          {d?.remark === null || d?.remark === "" ? (
                            ""
                          ) : (
                            <>
                              <span
                                style={{ color: "blue", marginLeft: "10px" }}
                              >
                                {" "}
                                - {currentDate.format("DD/MM/YYYY")}
                              </span>
                              {` ${d?.fullName} : ${d?.remark}`}
                            </>
                          )}
                        </>
                      ))}
                    </span>
                  </div>
                ) : (
                  <div
                    class="attenance-footer-right"
                    style={{ fontWeight: "bold" }}
                  >
                    Comments :
                    <span className="attenance-footer-right-item">
                      {printData?.map((d) => (
                        <>
                          {d?.remark === null || d?.remark === "" ? (
                            ""
                          ) : (
                            <>
                              <span
                                style={{ color: "blue", marginLeft: "10px" }}
                              >
                                {" "}
                                - {currentDate.format("DD/MM/YYYY")}
                              </span>
                              {` ${d?.englishName} : ${d?.remark}`}
                            </>
                          )}
                        </>
                      ))}
                    </span>
                  </div>
                )}
              </>
            </div>
            <div class="attenance-footer-bottom">
              <div class="attenance-footer-bottom-title">
                <>
                  {programmName === "កម្មវិធីភាសាខ្មែរ" ? (
                    <div>
                      <span
                        className="attenance-footer-bottom-title-date"
                        style={{ marginTop: "10px" }}
                      >
                        {khmerDateString}
                      </span>
                    </div>
                  ) : (
                    ""
                  )}
                </>
                <>
                  {programmName === "កម្មវិធីភាសាខ្មែរ" ? (
                    <div>
                      <span className="attenance-footer-bottom-title-date">
                        {`សៀមរាប ថ្ងៃទី${getKhmerNumber(
                          moment(currentDate).format("DD")
                        )} ខែ${currentMonth} ឆ្នាំ${getKhmerNumber(
                          moment(currentDate).format("YYYY")
                        )}`}
                      </span>
                    </div>
                  ) : (
                    <div>
                      <span
                        className="attenance-footer-bottom-title-date"
                        style={{ marginTop: "10px" }}
                      >
                        Siem Reap, Date: {currentDate.format("DD/MMMM/YYYY")}
                      </span>
                    </div>
                  )}
                </>
                <>
                  {programmName === "កម្មវិធីភាសាខ្មែរ" ? (
                    <div>
                      <span className="attenance-footer-bottom-title-teachername">
                        គ្រូបន្ទុកថ្នាក់
                      </span>
                    </div>
                  ) : (
                    <div>
                      <span className="attenance-footer-bottom-title-date">
                        Teacher
                      </span>
                    </div>
                  )}
                </>
                <>
                  {programmName === "កម្មវិធីភាសាខ្មែរ" ? (
                    <div style={{ margin: "50px 0px 0px 60px" }}>
                      <span className="attenance-footer-bottom-title-teachername">
                        {teacherData?.leadTeacherId?.lastName +
                          " " +
                          teacherData?.leadTeacherId?.firstName}
                      </span>
                    </div>
                  ) : (
                    <div style={{ margin: "50px 0px 0px 60px" }}>
                      <span className="attenance-footer-bottom-title-date">
                        {teacherData?.leadTeacherId?.lastName +
                          " " +
                          teacherData?.leadTeacherId?.firstName}
                      </span>
                    </div>
                  )}
                </>
              </div>
            </div>
          </div>
          <div style={{ marginTop: "20px" }}>
            <ReactToPrint
              content={reactToPrintContent}
              documentTitle="AwesomeFileName"
              onAfterPrint={handleAfterPrint}
              onBeforeGetContent={handleOnBeforeGetContent}
              onBeforePrint={handleBeforePrint}
              removeAfterPrint
              trigger={reactToPrintTrigger}
            />
          </div>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
