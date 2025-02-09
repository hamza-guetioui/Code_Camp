"use client";
import React from "react";

import Container from "@/components/container";

import IconMenu from "@/components/MUI/Menu";
import MenuDropItems from "@/components/MUI/MenuDropItems";
import IconMenuItem from "@/components/MUI/MenuItem";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChartLine, faCompass } from "@fortawesome/free-solid-svg-icons";

const Index = () => {
  return (
      <Container>
        <IconMenu>
          <IconMenuItem label="dashboard" link="/">
            <FontAwesomeIcon icon={faChartLine} />
          </IconMenuItem>

          <MenuDropItems
            label="Features"
            options={[
              { label: "Features List", link: "/features" },
              { label: "Features Add", link: "/features/add" },
            ]}
          >
            <FontAwesomeIcon icon={faCompass} />
          </MenuDropItems>
          <IconMenuItem label="dashboard" link="/">
            <FontAwesomeIcon icon={faChartLine} />
          </IconMenuItem>
        </IconMenu>
      </Container>
  );
};

export default Index;
