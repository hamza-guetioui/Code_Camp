"use client";
import React from "react";

import Container from "@/components/container";

import IconMenu from "@/components/MUI/IconMenu";
import MenuGroupItems from "@/components/MUI/IconMenu/MenuGroupItems";
import MenuItem from "@/components/MUI/IconMenu/MenuItem";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChartLine, faCompass } from "@fortawesome/free-solid-svg-icons";

const Index = () => {
  return (
    <Container>
      <IconMenu>
        <MenuItem label="Dashboard" link="/dashboard">
          <FontAwesomeIcon icon={faChartLine}  className="w-5 h-5" />
        </MenuItem>

        <MenuGroupItems
          label="Features"
          options={[
            { label: "Features List", link: "/dashboard/features", type: "list" },
            { label: "Features Add", link: "/dashboard/features/create-new", type: "add" },
          ]}
        >
          <FontAwesomeIcon icon={faCompass} className="w-5 h-5" />
        </MenuGroupItems>
      </IconMenu>
    </Container>
  );
};

export default Index;
