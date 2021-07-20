import React, { useEffect, useState } from "react";
import Client from "../../client/client";
import { Box, Button, Flex, Text } from "rebass";
import { PageContainer } from "../../components/themeComponents";
import styled from "@emotion/styled";
import { BLACK, BLUE, PURPLE, SOFT } from "../../themes";
import ExportForm from "../../forms/exportForm";
import ImportForm from "../../forms/importForm";
import PopupWindow from "../../components/popupWindow";
import StoryPlayer from "../../components/storyPlayer";
import { PageProps } from "../../App";

const TitleBox = styled(Box)`
  text-align: left;
  font-size: 52px;
  font-weight: bold;
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

const Player: React.FC<PageProps> = ({ message }) => {
  const [library, setLibrary] = useState<string[]>([]);
  const [manageLibrary, setManageLibrary] = useState(false);
  const [currentStory, setCurrentStory] = useState<string>();
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
    message.triggerMessage("Exported successfully!");
    setExportVisible(false);
  };

  const onDelete = (name: string): void => {
    Client.removeStory(name)
      .then()
      .catch((err) =>
        message.triggerAlert("Could not delete: " + err.data.response.message)
      );
  };

  const loadStory = (name: string): void => {
    Client.loadStory(name)
      .then(() => setCurrentStory(name))
      .catch((err) => message.triggerAlert(err.data.message));
  };

  const quitStory = (): void => {
    Client.quitStory()
      .then(() => setCurrentStory(undefined))
      .catch((err) => message.triggerAlert(err.data.message));
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
                        <Button onClick={() => loadStory(title)} bg={BLUE}>
                          Play
                        </Button>
                        <Box mx={"auto"} />
                        <Button
                          onClick={() => onClickExport(title)}
                          bg={PURPLE}
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

      {currentStory && (
        <PopupWindow visible={true} onClose={quitStory}>
          <StoryPlayer storyName={currentStory} />
        </PopupWindow>
      )}

      <PopupWindow
        visible={importVisible}
        onClose={() => setImportVisible(false)}
      >
        <ImportForm onSuccess={onImportSuccess} />
      </PopupWindow>
    </PageContainer>
  );
};

export default Player;
