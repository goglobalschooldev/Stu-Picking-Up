import React, { useState, useEffect } from "react";

export default function RowAttendance({
  print,
  days,
  indexKey,
  programmName,
}) {

  const [totalCome, setTotalCome] = useState(0);
  const [totalLate, setTotalLate] = useState(0);
  const [totalPermission, setTotalPermission] = useState(0);
  const [totalAbsence, setTotalAbsence] = useState(0);
  const [data, setData] = useState([]);

  const studentTotal = indexKey + 1;

  const normalDays = [
    print?.day1 === undefined ? "" : print?.day1,
    print?.day2 === undefined ? "" : print?.day2,
    print?.day3 === undefined ? "" : print?.day3,
    print?.day4 === undefined ? "" : print?.day4,
    print?.day5 === undefined ? "" : print?.day5,
    print?.day6 === undefined ? "" : print?.day6,
    print?.day7 === undefined ? "" : print?.day7,
    print?.day8 === undefined ? "" : print?.day8,
    print?.day9 === undefined ? "" : print?.day9,
    print?.day10 === undefined ? "" : print?.day10,
    print?.day11 === undefined ? "" : print?.day11,
    print?.day12 === undefined ? "" : print?.day12,
    print?.day13 === undefined ? "" : print?.day13,
    print?.day14 === undefined ? "" : print?.day14,
    print?.day15 === undefined ? "" : print?.day15,
    print?.day16 === undefined ? "" : print?.day16,
    print?.day17 === undefined ? "" : print?.day17,
    print?.day18 === undefined ? "" : print?.day18,
    print?.day19 === undefined ? "" : print?.day19,
    print?.day20 === undefined ? "" : print?.day20,
    print?.day21 === undefined ? "" : print?.day21,
    print?.day22 === undefined ? "" : print?.day22,
    print?.day23 === undefined ? "" : print?.day23,
    print?.day24 === undefined ? "" : print?.day24,
    print?.day25 === undefined ? "" : print?.day25,
    print?.day26 === undefined ? "" : print?.day26,
    print?.day27 === undefined ? "" : print?.day27,
    print?.day28 === undefined ? "" : print?.day28,
    print?.day29 === undefined ? "" : print?.day29,
    print?.day30 === undefined ? "" : print?.day30,
    print?.day31 === undefined ? "" : print?.day31,
  ];
  // console.log("totalData::", totalData)

  useEffect(() => {
    if (days.length === 31) {
      setData(normalDays);
    } else if (days.length === 30) {
      const days30 = normalDays.slice(0, 30);
      setData(days30);
    } else if (days.length === 29) {
      const days29 = normalDays.slice(0, 29);
      setData(days29);
    } else {
      const days28 = normalDays.slice(0, 28);
      setData(days28);
    }
  }, [print]);

  useEffect(() => {
    setTotalCome(data?.filter((item) => item === "1")?.length);
    setTotalLate(data?.filter((item) => item === "L")?.length);
    setTotalPermission(data?.filter((item) => item === "P")?.length);
    setTotalAbsence(data?.filter((item) => item === "A")?.length);
  }, [data]);

  return (
    <>
      <tr>
        <td class="first-col">{studentTotal}</td>
        <td class="first-col">{print?.studentId}</td>
        <td class="name-col-khmer">{print?.fullName}</td>
        <td class="name-col-eng">{print?.englishName}</td>
        <>
          {programmName === "កម្មវិធីភាសាខ្មែរ" ? (
            <td class="first-col-gender">{print?.gender}</td>
          ) : (
            <td class="first-col">{print?.gender === "ស្រី" ? "F" : "M"}</td>
          )}
        </>

        <>
          {data.map((day, index) => {
            return (
              <td
                key={index}
                class="type-att-cell"
                style={{
                  color:
                    day === "1"
                      ? "blue"
                      : day === "L"
                        ? "green"
                        : day === "P"
                          ? "rgb(224, 224, 86)"
                          : day === "A"
                            ? "red"
                            : "",
                }}
              >
                {day === "1"
                  ? "1"
                  : day === "L"
                    ? "L"
                    : day === "P"
                      ? "P"
                      : day === "A"
                        ? "A"
                        : ""}
              </td>
            );
          })}
        </>
        <td class="come-status">{totalCome}</td>
        <td class="late-status">{totalLate}</td>
        <td class="permission-status">{totalPermission}</td>
        <td class="absence-status">{totalAbsence}</td>
        <td class="first-col"></td>
      </tr>
    </>
  );
}
