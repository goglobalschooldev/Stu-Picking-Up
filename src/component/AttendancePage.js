import {
  Button,
  Col,
  Row,
  Form,
  Select,
  DatePicker,
  Menu,
  Dropdown,
} from "antd";
import React, { useState, useEffect } from "react";
import { BiUserPlus } from "react-icons/bi";
import { useTranslation } from "react-i18next";
import { useLazyQuery, useMutation, useQuery } from "@apollo/client";
import {
  BreadcrumbSet,
  LoadingCircleTiangle,
  LoadingCircleTiangleNoBG,
  openErrorNotification,
  openSuccessNotification,
} from "../function/own-comp";
import { SelectAcademicYear, SelectClass } from "../function/own-comp";
import AttendanceCard from "../component/attendance/attendanceDetails/attendanceCard";
import AddAttendance from "../component/attendance/modal/addAttendance";
import { useParams } from "react-router";
import {
  GET_ATTENDANCE_WITH_PAGINATION,
  GET_STUDENT_ATTENDANCE_BY_MONTH,
} from "../graphql/attendance";
import { BsThreeDotsVertical } from "react-icons/bs";
import { AiOutlineUser } from "react-icons/ai";
import moment from "moment";
import ExportToExcel from "../component/exportExcel/exportToExcel";
import {
  convertToExcelData,
  getDaysInMonthUTC,
  headers,
  convertToPrintData,
} from "../function/fn";
import FilterAttendance from "../component/attendance/modal/filterAttendance";
import PrintAttendanceByClass from "../component/attendance/modal/PrintAttendanceByClass";
import AddStudentAttendanceDate from "../component/attendance/modal/addStudentAttendanceDate";

const { Option } = Select;

export default function Attendance() {
  const { RangePicker } = DatePicker;

  const { t } = useTranslation();

  let [form] = Form.useForm();

  const [remarkData, setRemarkData] = useState([])
  let remarks = []

  const [excelHeader, setExcelHeader] = useState(headers);
  const [daysMonth, setDaysMonth] = useState([]);
  const [printData, setPrintData] = useState([]);
  const [storageData, setStorageData] = useState();
  const [showPrint, setShowPrint] = useState(false);
  const [openForm, setOpenForm] = useState(false);
  const { id, section, academic, programm, sectionType } = useParams();

  const [isSetDay, setIsSetDay] = useState(true);

  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [keyword, setKeyword] = useState("");
  const [tableData, setTableData] = useState([]);

  const [openAdd, setOpenAdd] = useState(false);
  const [attendanceByMonth, setAttendanceByMonth] = useState(null);

  const [editData, setEditData] = useState({});
  const [openEdit, setOpenEdit] = useState(false);

  const [openFilter, setOpenFilter] = useState(false);

  const [dataExcel, setDataExcel] = useState([]);

  // Modal Print Certificate
  const [openPrint, setOpenPrint] = useState(false);

  const handleOpenPrint = (e) => {
    setOpenPrint(true);
  };
  const handleClosePrint = (e) => {
    setOpenPrint(false);
  };

  const { data: studentAttendance, refetch: refetchByMonth } = useQuery(
    GET_STUDENT_ATTENDANCE_BY_MONTH,
    {
      variables: {
        month: parseInt(moment(new Date()).format("M")),
        sectionShiftId: section,
        academicYearId: academic,
      },
      onCompleted: ({ getStudentAttendanceByMonth }) => {
        // console.log("getStudentAttendanceByMonth::", getStudentAttendanceByMonth)
        setDataExcel(convertToExcelData(getStudentAttendanceByMonth));
        setAttendanceByMonth(getStudentAttendanceByMonth);
        setPrintData(convertToPrintData(getStudentAttendanceByMonth));
      },
      onError: (error) => {
        openErrorNotification({
          title: t("notification_error"),
          message: error.message,
        });
      },
      fetchPolicy: 'cache-and-network'
    }
  );

  const { data, loading, refetch } = useQuery(GET_ATTENDANCE_WITH_PAGINATION, {
    variables: {
      page: page,
      limit: limit,
      keyword: keyword,
      sectionShiftId: section,
      startDate: startDate,
      endDate: endDate,
      academicYearId: academic,
    },
    onCompleted: ({ getStudentAttendanceWithPagination }) => {
      setTableData(getStudentAttendanceWithPagination);
    },
    onError: (error) => {
      openErrorNotification({
        title: t("notification_error"),
        message: error.message,
      });
    },
    fetchPolicy: "cache-and-network",
  });

  useEffect(() => {
    if (isSetDay) {
      let header = [];
      let daysInMonth = getDaysInMonthUTC(
        new Date().getUTCMonth(),
        new Date().getUTCFullYear()
      );
      daysInMonth?.map((day) => {
        header.push({ label: `${parseInt(day)}`, key: `${parseInt(day)}` });
      });
      setExcelHeader([...excelHeader, ...header]);
      setIsSetDay(false);
      setDaysMonth(daysInMonth);
    }
  }, []);

  function onSelectDateRange(value, dateString) {
    if (value) {
      setStartDate(value[0]);
      setEndDate(value[1]);
    } else {
      setStartDate(null);
      setEndDate(null);
    }
  }

  useEffect(() => {
    if (showPrint === true) {
      setOpenPrint(true);
      setShowPrint(false);
    }
  }, [showPrint]);

  const handlePrintAttendance = (e) => {
    if (programm) {
      setOpenForm(true);
    } else {
      setOpenPrint(true);
    }
  };

  const menu = (
    <Menu>
      <Menu.Item key="1">
        <Button onClick={handlePrintAttendance}>
          <div style={{ display: "flex" }}>
            <div>Print Attendance</div>
          </div>
        </Button>
      </Menu.Item>

      <Menu.Item key="2" icon={<AiOutlineUser />}>
        <ExportToExcel
          headers={excelHeader}
          data={dataExcel}
          filename={`បញ្ជីវត្តមានសិស្សក្នុងមួយខែ`}
          title={"Export to CSV"}
        >
          <span style={{ color: "#000000" }}>
            {t("attendance_student_list")}
          </span>
        </ExportToExcel>
      </Menu.Item>

      {/* <Menu.Item key="2" icon={<AiOutlineUser />} >
                  <ExportToExcel
                      headers={excelHeader}
                      data={dataExcel}
                      filename={`បញ្ជីវត្តមានសិស្សក្នុងមួយខែ`}
                      title={"Export to CSV"}
                  >
                      <span style={{color:'#000000'}}>Attendance by Programme</span>
                  </ExportToExcel>
              </Menu.Item> */}
      {/* <Menu.Item key="2" icon={<AiOutlineUser />} onClick={() => setOpenFilter(true)}>
                  {t('attendance_bydaymonth_modal_title')}
              </Menu.Item> */}
      {/* <Menu.Item key="3" icon={<AiOutlineUser />}>
                  3rd menu item
              </Menu.Item> */}
    </Menu>
  );

  // console.log("tableData?.attendances::", tableData)
  // console.log("dddd::", printData)

  return (
    <>
      <AddAttendance
        open={openAdd}
        setOpen={setOpenAdd}
        sectionShiftId={section}
        academicYearId={academic}
        classId={id}
        setRefetch={refetch}
        setRefetchByMonth={refetchByMonth}
      />
      <AddStudentAttendanceDate
        open={openForm}
        setOpen={setOpenForm}
        setShowPrint={setShowPrint}
        setStorageData={setStorageData}
      />
      <>
        {tableData?.attendances?.map((e, index) => {

          if (moment(e?.attendanceDate).format("DD-MM-YYYY") === moment().format("DD-MM-YYYY")) {
            let remark = e?.students?.filter((d) => d?.remark !== null)
            remarks.push([...remark])
          }

          return (
            <>
              <PrintAttendanceByClass
                key={index}
                open={openPrint}
                onClose={handleClosePrint}
                totalData={attendanceByMonth}
                days={daysMonth}
                printData={printData}
                topData={e}
                classID={id}
                storageData={storageData}
                programmName={programm}
                sectionType={sectionType}
                remarkData={remarks}
              />
            </>
          )
        }
        )}
      </>
      <BreadcrumbSet
        data={[
          t("sidebar_attendance")?.toUpperCase(),
          t("sidebar_sub_attendance")?.toUpperCase(),
        ]}
      />
      <FilterAttendance open={openFilter} setOpen={setOpenFilter} />

      <Row>
        <Col xs={24} lg={8} style={{ padding: 10 }}>
          <label>{t("modal_label_date")} : </label>
          <RangePicker onChange={onSelectDateRange} />
        </Col>

        <Col
          xs={24}
          lg={{ span: 4, offset: 12 }}
          style={{ padding: 10, display: "flex" }}
        >
          <Dropdown overlay={menu} trigger={["click"]}>
            <Button
              size="large"
              style={{ marginRight: 10, width: 50, paddingTop: 6 }}
            >
              <BsThreeDotsVertical style={{ fontSize: 20 }} />
            </Button>
          </Dropdown>
          <Button
            style={{ width: "100%" }}
            type="primary"
            size="large"
            className="success-btn-custom"
            onClick={() => setOpenAdd(true)}
          >
            <BiUserPlus style={{ fontSize: 20 }} />{" "}
            <span>{t("btn_addnew")}</span>
          </Button>
        </Col>

        <Col xs={24}>
          {loading ? (
            <>
              <LoadingCircleTiangleNoBG loading={loading} />
            </>
          ) : (
            <Row>
              {tableData?.attendances?.map((e, index) => (
                <Col
                  xs={24}
                  key={index}
                  md={12}
                  xl={8}
                  xxl={6}
                  style={{ padding: 8 }}
                >
                  <AttendanceCard
                    key={index}
                    setRefetch={refetch}
                    sectionShiftId={section}
                    attendancesData={e}
                    setRefetchByMonth={refetchByMonth}
                  />
                </Col>
              ))}
            </Row>
          )}
        </Col>
      </Row>
    </>
  );
}
