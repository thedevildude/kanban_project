import React, { useState } from "react";
import DropdownMenu from "../InputComponents/DropdownMenu";
import Modal from "../modals/modal";
import CreateBoard from "../InputComponents/CreateBoard";
import AddNewButton from "../buttons/AddNewButton";
import { CgAddR } from "react-icons/cg";

const Boards = () => {
  const [newBoard, setNewBoard] = useState(false);
  return (
    <div className="flex flex-col gap-5 w-full">
      <p className="text-2xl font-bold">My Boards</p>
      <div className="flex justify-between">
        <DropdownMenu
          triggerText="Filter"
          items={["Personal Boards", "Team Boards"]}
        />
        <AddNewButton
          buttonClickCB={() => setNewBoard(true)}
          label="New Board"
          icon={<CgAddR className="h-5 w-5" />}
        />
        <Modal open={newBoard} closeCB={() => setNewBoard(false)}>
          <CreateBoard />
        </Modal>
      </div>
    </div>
  );
};

export default Boards;
