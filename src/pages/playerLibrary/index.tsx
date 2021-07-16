import React, { useEffect, useState } from "react";
import Client from "../../client/client";
import { Box, Button, Flex, Text } from "rebass";
import { PageContainer } from "../../components/themeComponents";
import LinkButton from "../../components/linkButton";
import { ParameterizedRoutes } from "../../App";
import styled from "@emotion/styled";
import { BLACK, BLUE, LIGHT_BLUE, SOFT } from "../../themes";
import Alert from "../../components/alert";
import ExportForm from "../../forms/exportForm";
import ImportForm from "../../forms/importForm";
import PopupWindow from "../../components/popupWindow";

const TitleBox = styled(Box)`
  text-align: left;
  font-size: 52px;
  font-weight: bold;
  padding-left: 20px;
  margin-top: 30px;
  margin-bottom: 50px;
`;

const EmptyLibrary = styled(Box)`
  text-align: center;
  width: 100%;
  font-size: 20px;
  padding-top: 30px;
`;

const StoryCard = styled(Box)`
  padding: 20px 20px;
  width: 200px;
  border: 2px solid ${BLACK};
  border-radius: 5px;
  margin-right: 20px;
`;

const CardHeader = styled(Text)`
  font-size: 19px;
  font-weight: bold;
  padding-top: 5px;
  padding-bottom: 15px;
`;

const BottomBox = styled(Box)`
  position: absolute;
  bottom: 50px;
  right: 50px;
`;

const PlayerLibrary: React.FC = () => {
  const [library, setLibrary] = useState<string[]>([]);
  const [manageLibrary, setManageLibrary] = useState(false);
  // Alert
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertWarn, setAlertWarn] = useState(false);
  // Export Form
  const [exportVisible, setExportVisible] = useState(false);
  const [exportName, setExportName] = useState<string>();
  // Import Form
  const [importVisible, setImportVisible] = useState(false);

  useEffect(() => {
    updateLibrary();
  });

  const updateLibrary = (): void => {
    Client.getAllStoryNames().then((res) => setLibrary(res));
  };

  const onClickExport = (name: string): void => {
    setExportVisible(true);
    setExportName(name);
  };

  const onImportSuccess = (): void => {
    setImportVisible(false);
    updateLibrary();
  };

  const onExportSuccess = (): void => {
    triggerAlert("Exported successfully!");
    setExportVisible(false);
  };

  const onDelete = (name: string): void => {
    Client.removeStory(name)
      .then()
      .catch((err) => triggerAlert("Could not delete: " + err.message, true));
  };

  const triggerAlert = (message: string, warn?: boolean): void => {
    setAlertMessage(message);
    setAlertVisible(true);
    if (warn) {
      setAlertWarn(warn);
    }
  };

  return (
    <PageContainer>
      <TitleBox>
        <Text>Play stories in your library!</Text>
      </TitleBox>
      <Flex flexWrap={"wrap"}>
        {library.map((title) => {
          return (
            <StoryCard key={title}>
              <CardHeader>{title}</CardHeader>
              {(() => {
                switch (manageLibrary) {
                  case false:
                    return (
                      <Flex mb={"5px"}>
                        <LinkButton
                          to={ParameterizedRoutes.PLAY(title)}
                          bg={BLUE}
                        >
                          Play
                        </LinkButton>
                        <Box mx={"auto"} />
                        <Button
                          onClick={() => onClickExport(title)}
                          bg={LIGHT_BLUE}
                        >
                          Export
                        </Button>
                      </Flex>
                    );
                  case true:
                    return (
                      <Button onClick={() => onDelete(title)} bg={"red"}>
                        Delete
                      </Button>
                    );
                }
              })()}
            </StoryCard>
          );
        })}
        {library.length === 0 && (
          <EmptyLibrary>
            <Text>
              You don't have any stories in your library. Import some by
              clicking "Manage Library." Then click "Import!"
            </Text>
          </EmptyLibrary>
        )}
      </Flex>

      <BottomBox>
        {manageLibrary && (
          <Button onClick={() => setImportVisible(true)} bg={BLUE} mr={20}>
            Import
          </Button>
        )}
        <Button
          onClick={() => setManageLibrary((prev) => !prev)}
          padding={"15px 25px"}
          bg={SOFT}
        >
          {manageLibrary ? "Stop Managing Library" : "Manage Library"}
        </Button>
      </BottomBox>

      {exportName && (
        <PopupWindow
          visible={exportVisible}
          onClose={() => setExportVisible(false)}
        >
          <ExportForm name={exportName} onSuccess={onExportSuccess} />
        </PopupWindow>
      )}

      <PopupWindow
        visible={importVisible}
        onClose={() => setImportVisible(false)}
      >
        <ImportForm onSuccess={onImportSuccess} />
      </PopupWindow>

      <Alert
        visible={alertVisible}
        message={alertMessage}
        warn={alertWarn}
        onClose={() => setAlertVisible(false)}
      />
    </PageContainer>
  );
};

export default PlayerLibrary;
