import Data from './data.js'
import {
  table
} from './entry.js'
export const Control = {
  updateRowListners() {
    for (let value of document.getElementsByTagName('tr')) {
      //if delete button pressed
      value.onclick = function () {
        if (event.target.classList.contains('delete-btn')) {
          this.remove()
          const id = this.firstChild.textContent;
          Data.deleteUser(id)
        }
        //if createBtnPressed
        if (event.target.classList.contains('create-btn')) { //cancel btn logic
          table.table.rows[table.table.rows.length - 1].remove()
          const row = table.createRow(table.width + 1, {}, "td", false); //create row //replace last row with it and init input
          table.table.lastChild.firstChild.textContent = Number(row.previousSibling.cells[0].textContent) + 1
          table.createInputsInCells(row.cells);
          table.createControlElement(row.cells[row.cells.length - 1], table.typeOfControlBtns["saveCreated"])
          Control.updateRowListners()
        }
        //if editBtnPressed
        if (event.target.classList.contains('edit-btn')) {
          const pressedRow = this;
          table.createInputsInCells(pressedRow.cells);

          table.createControlElement(table.deleteControllBtns(pressedRow), table.typeOfControlBtns['edit'])
          createSaveBtnLogic()
          createCancelBtnLogic()

        }
        //saveCreated
        if (event.target.classList.contains('saveCreated-btn')) {
          const row = event.target.closest('tr')
          Data.createUser(table.getRowInfo(row)) //send info to server
          table.changeInputsToSimpleField("save", row)
          table.createControlElement(table.deleteControllBtns(row), table.typeOfControlBtns['plane']);
          table.createBtnCreate();
          Control.updateRowListners()
        }
        if (event.target.classList.contains('deleteCreated-btn')) {
        event.target.closest('tr').remove();
        table.createBtnCreate()
        Control.updateRowListners()
        }

        function createSaveBtnLogic() {
          const listOfSaveBtns = document.getElementsByClassName('save-btn');
          for (let elem of listOfSaveBtns) {
            if (!elem.onclick) {
              elem.onclick = (event) => {
                const row = event.target.closest('tr')
                Data.putUserInfo(row.cells[0].textContent, table.getRowInfo(row)) //send info to server

                table.changeInputsToSimpleField("save", row)
                table.createControlElement(table.deleteControllBtns(row), table.typeOfControlBtns['plane']);
              }
            }
          }
        }

        function createCancelBtnLogic() {
          const listOfCancelBtns = document.getElementsByClassName('cancel-btn');
          for (let elem of listOfCancelBtns) {
            if (!elem.onclick) {
              elem.onclick = cancelBtnPressed(elem.closest('tr'));

              function cancelBtnPressed(pressedRow) {
                let oldInfoOfCell = table.getRowInfo(pressedRow);
                return event => {
                  const row = event.target.closest('tr')
                  table.changeInputsToSimpleField("cancel", row, oldInfoOfCell)
                  table.createControlElement(table.deleteControllBtns(row), table.typeOfControlBtns["plane"]);
                }
              }
            }
          }
        }
      }
    }
  }
}