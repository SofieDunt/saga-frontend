import React, { useEffect, useState } from "react";
import Client from "../../client/client";
import { Box, Button, Flex, Text } from "rebass";
import {
  BottomBox,
  EmptyLibrary,
  PageContainer,
  TitleBox,
} from "../../components/themeComponents";
import { BLUE, PURPLE, SOFT } from "../../themes";
import ExportForm from "../../forms/exportForm";
import ImportForm from "../../forms/importForm";
import PopupWindow from "../../components/popupWindow";
import { PageProps } from "../../App";
import WorkEditor from "../../components/workEditor";
import { ApplicationTypes, ErrorResponse } from "../../client/types";
import BoxCard from "../../components/boxCard";

const Writer: React.FC<PageProps> = ({ message }) => {
  const [library, setLibrary] = useState<string[]>([]);
  const [manageLibrary, setManageLibrary] = useState(false);
  const [currentWork, setCurrentWork] = useState<string>();
  // Export Form
  const [exportVisible, setExportVisible] = useState(false);
  const [exportName, setExportName] = useState<string>();
  // Import Form
  const [importVisible, setImportVisible] = useState(false);

  useEffect(() => {
    Client.getAllWorkNames().then(
      (res) => setLibrary(res),
      (err: ErrorResponse) => window.alert(err.message)
    );
  });

  const updateLibrary = (): void => {
    Client.getAllWorkNames().then((res) => setLibrary(res), message.errorAlert);
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
    Client.removeWork(name)
      .then()
      .catch((err: ErrorResponse) =>
        message.triggerAlert("Could not delete: " + err.message)
      );
  };

  const loadWork = (name: string): void => {
    Client.loadWork(name)
      .then(() => setCurrentWork(name))
      .catch((err: ErrorResponse) => message.triggerAlert(err.message));
  };

  const quitWork = (): void => {
    Client.quitWork()
      .then(() => setCurrentWork(undefined))
      .catch((err: ErrorResponse) => message.triggerAlert(err.message));
  };

  return (
    <PageContainer>
      <TitleBox>
        <Text>Write your next story!</Text>
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
                        <Button onClick={() => loadWork(title)} bg={BLUE}>
                          Edit
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
            </BoxCard>
          );
        })}
        {library.length === 0 && (
          <EmptyLibrary>
            <Text>
              You don't have any works in your library. Create a new one!
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
            exportType={ApplicationTypes.WORK}
          />
        </PopupWindow>
      )}

      {currentWork && (
        <PopupWindow visible={true} onClose={quitWork}>
          <WorkEditor message={message} workName={currentWork} />
        </PopupWindow>
      )}

      <PopupWindow
        visible={importVisible}
        onClose={() => setImportVisible(false)}
      >
        <ImportForm
          onSuccess={onImportSuccess}
          importType={ApplicationTypes.WORK}
        />
      </PopupWindow>
    </PageContainer>
  );
};

export default Writer;
