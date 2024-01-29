import Base from "./Base";
import { CharacterProvider } from "./shared/CharacterContext";

const App: React.FC = () => {
  return (
    <CharacterProvider>
      <Base />
    </CharacterProvider>
  );
};

export default App;
