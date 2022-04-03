// From figma

import React from "react";
import Arc from "../Arc";
import FieldButton from "../FieldButton";
import "./AccountSettingsPage.css";

function AccountSettingsPage(props) {
  const {
    searchDivLayout,
    arcProps,
    fieldButton1Props,
    fieldButton2Props,
    fieldButton3Props,
    fieldButton4Props,
    fieldButton5Props,
    fieldButton6Props,
  } = props;

  return (
    <div className="container-center-horizontal">
      <div className="account-settings-page screen">
        <img className="title-1" src="/img/title@1x.svg" />
        <Arc arc2Props={arcProps.arc2Props} />
        <div className="search-div-1">
          <div className="flex-row">
            <img className="search-div-layout" src={searchDivLayout} />
            <div className="frame-1">
              <FieldButton
                className={fieldButton1Props.className}
                fieldButton2Props={fieldButton1Props.fieldButton2Props}
              />
              <FieldButton
                className={fieldButton2Props.className}
                fieldButton2Props={fieldButton2Props.fieldButton2Props}
              />
              <FieldButton
                className={fieldButton3Props.className}
                fieldButton2Props={fieldButton3Props.fieldButton2Props}
              />
              <FieldButton
                className={fieldButton4Props.className}
                fieldButton2Props={fieldButton4Props.fieldButton2Props}
              />
              <FieldButton
                className={fieldButton5Props.className}
                fieldButton2Props={fieldButton5Props.fieldButton2Props}
              />
              <FieldButton
                className={fieldButton6Props.className}
                fieldButton2Props={fieldButton6Props.fieldButton2Props}
              />
            </div>
          </div>
          <div className="frame-1-1">
            <img className="login-2" src="/img/login@2x.svg" />
            <img className="login-3" src="/img/login-1@2x.svg" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default AccountSettingsPage;
