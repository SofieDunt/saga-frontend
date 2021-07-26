import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import Client from "../../client/client";
import { Button, Flex, Text } from "rebass";
import {
  BottomFlex,
  EmptyLibrary,
  FormContainer,
  PageContainer,
  SecondaryButton,
  TitleBox,
} from "../../components/themeComponents";
import { PRIMARY, TERTIARY, WARN } from "../../themes";
import ExportForm from "../../forms/exportForm";
import ImportForm from "../../forms/importForm";
import PopupWindow from "../../components/popupWindow";
import { ErrorHandlerProps, Routes } from "../../App";
import { ApplicationTypes, ErrorResponse } from "../../client/types";
import BoxCard from "../../components/boxCard";
import SoftButton from "../../components/softButton";

const Player: React.FC<ErrorHandlerProps> = ({ message }) => {
  const [library, setLibrary] = useState<string[]>([]);
  const [manageLibrary, setManageLibrary] = useState(false);
  // Export Form
  const [exportVisible, setExportVisible] = useState(false);
  const [exportName, setExportName] = useState<string>();
  // Import Form
  const [importVisible, setImportVisible] = useState(false);

  const history = useHistory();

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
      () => history.push(Routes.PLAYER_PLAY),
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
            <BoxCard key={title} title={title}>
              {(() => {
                switch (manageLibrary) {
                  case false:
                    return (
                      <Flex mb={"5px"}>
                        <Button
                          onClick={() => loadStory(title)}
                          bg={PRIMARY}
                          mr={"5px"}
                        >
                          Play
                        </Button>
                        <SoftButton
                          text={"Export"}
                          onClick={() => onClickExport(title)}
                        />
                      </Flex>
                    );
                  case true:
                    return (
                      <Button onClick={() => onDelete(title)} bg={WARN}>
                        Delete
                      </Button>
                    );
                }
              })()}
            </BoxCard>
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

      <BottomFlex>
        <SecondaryButton onClick={() => setImportVisible(true)} mr={"10px"}>
          Import
        </SecondaryButton>
        <Button
          onClick={() => setManageLibrary((prev) => !prev)}
          padding={"15px 25px"}
          bg={TERTIARY}
        >
          {manageLibrary ? "Stop Managing Library" : "Manage Library"}
        </Button>
      </BottomFlex>

      {exportName && (
        <PopupWindow
          visible={exportVisible}
          onClose={() => setExportVisible(false)}
        >
          <FormContainer>
            <ExportForm
              name={exportName}
              onSuccess={onExportSuccess}
              exportType={ApplicationTypes.STORY}
            />
          </FormContainer>
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
