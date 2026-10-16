import { ConfigProvider, theme } from "antd";
import Todo from "./Todo";

function App() {
  return (
    <ConfigProvider
      theme={{
        algorithm: theme.darkAlgorithm,
        token: {
          colorPrimary: "#000000",
          colorBgBase: "#000000",
          borderRadius: 6,
        },
        components: {
          Checkbox: {
            borderRadiusSM: 999,
            colorPrimary: "#0a0a0a",
            colorPrimaryHover: "#27272a",
          },
        },
      }}
    >
      <Todo />
    </ConfigProvider>
  );
}

export default App;
