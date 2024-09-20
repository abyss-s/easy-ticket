import React, { useEffect } from "react";
import Button from "../components/button/Button";
import { useAtom } from "jotai";
import { themeSiteAtom } from "../store/atom";

export default {
  title: "Components/Button",
  component: Button,
  argTypes: {
    type: {
      options: [null, "outline", "help", "mode", "modal", "record", "outro"],
      control: { type: "select" },
      defaultValue: null
    },
    theme: {
      options: ["interpark", "melonticket", "ticketlink", "yes24"],
      control: { type: "select" },
      defaultValue: null
    },
    onClick: { action: "clicked" }
  }
};

const Template = (args) => {
  const [themeSite, setThemeSite] = useAtom(themeSiteAtom);

  useEffect(() => {
    if (args.theme) {
      setThemeSite(args.theme);
    }
  }, [args.theme, setThemeSite]);

  return <Button {...args} />;
};

export const DefaultButton = Template.bind({});
DefaultButton.args = {
  text: "디폴트 버튼",
  type: null,
  onClick: () => {}
};

export const OutlineButton = Template.bind({});
OutlineButton.args = {
  text: "아웃라인 버튼",
  type: "outline",
  onClick: () => {}
};

export const HelpButton = Template.bind({});
HelpButton.args = {
  text: "도움말 버튼",
  type: "help",
  onClick: () => {}
};

export const ModeButton = Template.bind({});
ModeButton.args = {
  text: "모드 선택",
  type: "mode",
  onClick: () => {},
  icon: "../../public/assets/images/icons/site/interpark.svg" // 아이콘 추가
};

export const ModalButton = Template.bind({});
ModalButton.args = {
  text: "모달 버튼",
  type: "modal",
  onClick: () => {}
};

export const RecordButton = Template.bind({});
RecordButton.args = {
  text: "기록보기 버튼",
  type: "record",
  onClick: () => {}
};

export const OutroButton = Template.bind({});
OutroButton.args = {
  text: "아웃트로 버튼",
  type: "outro",
  onClick: () => {}
};
