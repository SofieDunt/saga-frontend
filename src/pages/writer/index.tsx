import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import Client from "../../client/client";
import { Button, Flex, Text } from "rebass";
import {
  BottomFlex,
  EmptyLibrary,
  FormContainer,
  PageContainer,
  PrimaryButton,
  TitleBox,
} from "../../components/themeComponents";
import { BLUE, SOFT } from "../../themes";
import ImportForm from "../../forms/importForm";
import PopupWindow from "../../components/popupWindow";
import { ErrorHandlerProps, Routes } from "../../App";
import { ApplicationTypes, ErrorResponse } from "../../client/types";
import BoxCard from "../../components/boxCard";
import StartWorkForm from "../../forms/startWorkForm";
import RenameWorkForm from "../../forms/renameWorkForm";

const Writer: React.FC<ErrorHandlerProps> = ({ message }) => {
  const [library, setLibrary] = useState<string[]>([]);
  const [manageLibrary, setManageLibrary] = useState(false);
  // Form visibility
  const [renameVisible, setRenameVisible] = useState(false);
  const [startVisible, setStartVisible] = useState(false);
  const [importVisible, setImportVisible] = useState(false);

  const history = useHistory();

  useEffect(() => {
    Client.getAllWorkNames()
      .then((res) => setLibrary(res))
      .catch((err) => window.alert(err.message));
  });

  const updateLibrary = (): void => {
    Client.getAllWorkNames().then((res) => setLibrary(res), message.errorAlert);
  };

  const onRenameSuccess = (): void => {
    setRenameVisible(false);
    updateLibrary();
  };

  const onStartNewSuccess = (): void => {
    setStartVisible(false);
    updateLibrary();
  };

  const onImportSuccess = (): void => {
    setImportVisible(false);
    updateLibrary();
  };

  const onDelete = (name: string): void => {
    Client.removeWork(name).then(updateLibrary, (err: ErrorResponse) =>
      message.triggerAlert("Could not delete: " + err.message)
    );
  };

  const loadWork = (name: string): void => {
    Client.loadWork(name).then(
      () => history.push(Routes.WRITER_EDIT),
      message.errorAlert
    );
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
                      <Flex>
                        <PopupWindow
                          visible={renameVisible}
                          onClose={() => setRenameVisible(false)}
                        >
                          <FormContainer>
                            <RenameWorkForm
                              currentName={title}
                              onSuccess={onRenameSuccess}
                              message={message}
                            />
                          </FormContainer>
                        </PopupWindow>
                        <PrimaryButton
                          onClick={() => setRenameVisible(true)}
                          mr={"5px"}
                        >
                          Rename
                        </PrimaryButton>
                        <Button onClick={() => onDelete(title)} bg={"red"}>
                          Delete
                        </Button>
                      </Flex>
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

      <BottomFlex>
        <PrimaryButton onClick={() => setStartVisible(true)}>
          Start New Story
        </PrimaryButton>
        <PrimaryButton onClick={() => setImportVisible(true)} mx={"10px"}>
          Import
        </PrimaryButton>
        <Button
          onClick={() => setManageLibrary((prev) => !prev)}
          padding={"15px 25px"}
          bg={SOFT}
        >
          {manageLibrary ? "Stop Managing Library" : "Manage Library"}
        </Button>
      </BottomFlex>

      <PopupWindow
        visible={startVisible}
        onClose={() => setStartVisible(false)}
      >
        <FormContainer>
          <StartWorkForm onSuccess={onStartNewSuccess} message={message} />
        </FormContainer>
      </PopupWindow>

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
