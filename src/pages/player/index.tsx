import React, { useEffect, useState } from "react";
import Client from "../../client/client";
import { Box, Button, Flex, Text } from "rebass";
import {
  BottomBox,
  CardHeader,
  EmptyLibrary,
  PageContainer,
  StoryCard,
  TitleBox,
} from "../../components/themeComponents";
import { BLUE, PURPLE, SOFT } from "../../themes";
import ExportForm from "../../forms/exportForm";
import ImportForm from "../../forms/importForm";
import PopupWindow from "../../components/popupWindow";
import StoryPlayer from "../../components/storyPlayer";
import { PageProps } from "../../App";
import { ApplicationTypes, ErrorResponse } from "../../client/types";

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
    Client.getAllStoryNames().then(
      (res) => setLibrary(res),
      (err: ErrorResponse) => window.alert(err.message)
    );
  });

  const updateLibrary = (): void => {
    Client.getAllStoryNames().then(
      (res) => setLibrary(res),
      message.errorAlert
    );
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
    Client.removeStory(name).then(
      () => {},
      (err: ErrorResponse) =>
        message.triggerAlert("Could not delete: " + err.message)
    );
  };

  const loadStory = (name: string): void => {
    Client.loadStory(name).then(
      () => setCurrentStory(name),
      message.errorAlert
    );
  };

  const quitStory = (): void => {
    Client.quitStory().then(
      () => setCurrentStory(undefined),
      message.errorAlert
    );
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
          <ExportForm
            name={exportName}
            onSuccess={onExportSuccess}
            exportType={ApplicationTypes.STORY}
          />
        </PopupWindow>
      )}

      {currentStory && (
        <PopupWindow visible={true} onClose={quitStory}>
          <StoryPlayer storyName={currentStory} message={message} />
        </PopupWindow>
      )}

      <PopupWindow
        visible={importVisible}
        onClose={() => setImportVisible(false)}
      >
        <ImportForm
          onSuccess={onImportSuccess}
          importType={ApplicationTypes.STORY}
        />
      </PopupWindow>
    </PageContainer>
  );
};

export default Player;
