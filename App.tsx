import { Fragment } from "react";
import Base from "./Base";
import { CharacterProvider } from "./shared/CharacterContext";
import { StatusBar } from "expo-status-bar";

const App: React.FC = () => {
  return (
    <Fragment>
      <StatusBar style="light" />
      <CharacterProvider>
        <Base />
      </CharacterProvider>
    </Fragment>
  );
};

export default App;
