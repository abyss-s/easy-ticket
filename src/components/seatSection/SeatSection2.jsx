import Section from "./section/Section";
import styled from "styled-components";
import { useAtomValue, useAtom, useSetAtom } from "jotai";
import {
  postersAtom,
  selectedPosterAtom,
  seatInfoAtom,
  allowedSeatAtom,
  sectionColorAtom
} from "../../store/atom";
import convertPriceObjectToArray from "../../util/convertPriceObjectToArray";

const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(2, 1fr);
`;
const SectionColor = styled(Section)`
  background-color: ${(props) => props.color};
`;

const SeatSection1 = () => {
  const Posters = useAtomValue(postersAtom);
  const posterId = useAtomValue(selectedPosterAtom);
  const poster = Posters[posterId];

  const colors = useAtomValue(sectionColorAtom);

  const [seatInfo, setSeatInfo] = useAtom(seatInfoAtom);
  const [allowedSeat, setAllowedSeat] = useAtom(allowedSeatAtom);

  const priceArr = convertPriceObjectToArray(poster.price);
  const date = poster.date[0];
  const lengthOfprice = priceArr.length;
  const cycle = Math.ceil(6 / lengthOfprice);
  //수수료
  const fee = poster.fee;

  const storeSeatInfo = (sectionIndex) => {
    const sectionPrice = priceArr[Math.floor(sectionIndex / 2) % lengthOfprice];
    setSeatInfo({
      ...seatInfo,
      grade: sectionPrice.grade,
      price: sectionPrice.price,
      date: date,
      color: colorMapping[sectionIndex],
      fee: fee
    });
    setAllowedSeat({ ...allowedSeat, gridIndex: 1 });
  };
  const shapeMapping = {
    0: "TrapezoidLeft",
    1: "Rectangle",
    2: "TrapezoidRight"
  };
  const colorMapping = {
    0: colors[0],
    1: colors[0],
    2: colors[0],
    3: colors[3],
    4: colors[3],
    5: colors[3]
  };
  return (
    <Container>
      {[0, 1, 2, 3, 4, 5].map((sectionIndex) => (
        <SectionColor
          num={sectionIndex + 1}
          key={sectionIndex}
          size={"small"}
          shape={shapeMapping[sectionIndex]}
          color={colorMapping[sectionIndex]}
          storeSeatInfo={() => storeSeatInfo(sectionIndex)}
        ></SectionColor>
      ))}
    </Container>
  );
};

export default SeatSection1;
