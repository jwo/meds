import React, { Component } from "react";
import { Camper, Cabin } from "./Camper";
// @ts-ignore
import { CSVReader } from "react-papaparse";
import Button from "@material-ui/core/Button";
import { Typography } from "@material-ui/core";

const isBool = (value: string): Boolean => {
  if (!value) return false;
  if (value.toString().replace(" ", "").length === 0) return false;
  if (RegExp(/once a month/i).test(value)) return false;
  if (RegExp(/none/i).test(value)) return false;
  if (value.toLowerCase() === "0") return false;
  if (value.toLowerCase() === "x") return false;
  if (value.toLowerCase() === "o") return false;
  if (value.toLowerCase() === "n/a") return false;
  if (value.toLowerCase() === "na") return false;
  if (value.toLowerCase() === "zero") return false;
  if (value.toLowerCase() === "dosage is every other day") return false;

  return true;
};

interface Props {
  receiveAllCampers: (campers: Camper[]) => void;
}

interface CSVRowData {
  "First Name": string;
  "Last Name": string;
  "2019 Cabin": string;
  "Medications_ Does This Camper Need Assistance With Their Factor Or Can They Infuse Completely On Their Own Without Assistance? ( El Participante Del Campamento Necesita Asistencia Para Administrarse El Factor O Puede El Administrarse Completamente Solo Y Sin Asistencia Su Infusión?)_281": string;
  "Medications_ Monday_274": string;
  "Medications_ Tuesday_275": string;
  "Medications_ Wednesday_276": string;
  "Medications_ Thursday_277": string;
}

interface CSVData {
  data: CSVRowData[];
}

class App extends Component<Props> {
  fileInput: React.RefObject<HTMLInputElement>;

  constructor(props: Props) {
    super(props);
    this.fileInput = React.createRef();
  }

  handleReadCSV = (data: CSVData) => {
    const campers = data.data
      .map(row => {
        const camper = new Camper(
          [row["First Name"], row["Last Name"]].join(" "),
          row["2019 Cabin"] as Cabin,
          row[
            "Medications_ Does This Camper Need Assistance With Their Factor Or Can They Infuse Completely On Their Own Without Assistance? ( El Participante Del Campamento Necesita Asistencia Para Administrarse El Factor O Puede El Administrarse Completamente Solo Y Sin Asistencia Su Infusión?)_281"
          ] !==
            "Infuses at home on a regular basis without any assistance (Administra su infusión en casa regularmente sin asistencia).",
          isBool(row["Medications_ Monday_274"]),
          isBool(row["Medications_ Tuesday_275"]),
          isBool(row["Medications_ Wednesday_276"]),
          isBool(row["Medications_ Thursday_277"])
        );
        return camper;
      })
      .filter(c => c.name !== " ");

    this.props.receiveAllCampers(campers);
  };

  handleOnError = (err: Error, _file: any, _inputElem: any, _reason: any) => {
    console.log(err);
  };

  handleImportOffer = () => {
    this.fileInput.current
      ? this.fileInput.current.click()
      : console.log("handleImportOffer not implemented");
  };

  render() {
    return (
      <div className="upload">
        <Typography variant="h1">Cabin Daily</Typography>
        <CSVReader
          onFileLoaded={this.handleReadCSV}
          inputRef={this.fileInput}
          style={{ display: "none" }}
          onError={this.handleOnError}
          configOptions={{ header: true /* Header row support */ }}
        />
        <Button
          variant={"contained"}
          color="primary"
          onClick={this.handleImportOffer}
        >
          Import CSV File
        </Button>
      </div>
    );
  }
}

export default App;
