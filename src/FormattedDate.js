import React from "react";
import moment from "moment-timezone";

export default function FormattedDate() {
  const userTimeZone = moment.tz.guess();
  const formattedDate = moment().tz(userTimeZone).format("dddd h:mm a ");

  return <span>{formattedDate}, </span>;
}
