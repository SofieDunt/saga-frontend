import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import Client from "../../client/client";
import { Button, Flex, Text } from "rebass";
import {
  BottomBox,
  EmptyLibrary,
  PageContainer,
  TitleBox,
} from "../../components/themeComponents";
import { BLUE, SOFT } from "../../themes";
import ImportForm from "../../forms/importForm";
import PopupWindow from "../../components/popupWindow";
import { ErrorHandlerProps, Routes } from "../../App";
import { ApplicationTypes, ErrorResponse } from "../../client/types";
import BoxCard from "../../components/boxCard";

const Writer: React.FC<ErrorHandlerProps> = ({ message }) => {
  const [library, setLibrary] = useState<string[]>([]);
  const [manageLibrary, setManageLibrary] = useState(false);
  // Import Form
  const [importVisible, setImportVisible] = useState(false);

  const history = useHistory();

  useEffect(() => {
    Client.getAllWorkNames().then(
      (res) => setLibrary(res),
      (err: ErrorResponse) => window.alert(err.message)
    );
  });

  const updateLibrary = (): void => {
    Client.getAllWorkNames().then((res) => setLibrary(res), message.errorAlert);
  };

  const onImportSuccess = (): void => {
    setImportVisible(false);
    updateLibrary();
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
      .then(() => history.push(Routes.WRITER_EDIT))
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
                      <Button
                        onClick={() => loadWork(title)}
                        bg={BLUE}
                        mb={"5px"}
                      >
                        Edit
                      </Button>
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
