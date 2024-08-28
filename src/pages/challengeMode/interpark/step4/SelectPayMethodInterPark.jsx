import styled from "styled-components";
import DetailPayForm from "../../../../components/forms/pay/DetailPayForm";
import { useAtomValue } from "jotai";
import { selectedPosterAtom } from "../../../../store/atom";
import { FormWrap } from "../../../../components/forms/FormStyle";
import UsablePoint from "../../components/payMethod/UsablePoint";
import MyBookingInfo from "../../../../components/myBookingInfo/MyBookingInfo";
import PosterInfo from "../../../../components/poster/PosterInfo";
import { MyBookingInfoContainer } from "../../../../components/myBookingInfo/MyBookingInfoContainer";
import PrevNextButton from "../../../../components/myBookingInfo/PrevNextButton";
import { useNavigate } from "react-router-dom";
import { usePaymentValidate } from "../../../../hooks/usePaymentValidate";
import { useForm } from "../../../../hooks/useForm";
import PayMethodForm from "../../../../components/forms/pay/PayMethodForm";
import { SubTtitle } from "../../../practiceMode/step4/SelectPayMethod";

//결제 수단 + 결제 방식 + 내 예매 정보
const PayMethodWrap = styled.div`
  display: flex;
  gap: 15px;
`;

//결제 수단
const PayMethodContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
  border-right: 2px solid var(--fill-color);
`;

//결제 방식
const DetailPayFormContainer = styled(FormWrap)`
  width: 400px;
  border-right: 2px solid var(--fill-color);
`;
const CardInfo = styled.div`
  display: flex;
  gap: 20px;
  background-color: var(--dimmed-color);
  padding: 10px;
`;

//무이자 할부 안내 버튼
const FakeButton = styled.div`
  background-color: var(--point-color);
  color: #fff;
  font-size: 14px;
  width: 120px;
  height: 25px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 4px;
`;

//현금영수증 발급 안내
const Info = styled.span`
  font-size: 16px;
  font-family: "pretendardM";
  margin-top: 50px;
  width: 90%;
  line-height: 20px;
  color: var(--text-color2);
`;

//결제방식관련 안내 문구
const PayMethodInfo = styled.span`
  color: var(--point-color);
`;

const SelectPayMethodInterPark = () => {
  //포스터 정보
  const posterId = useAtomValue(selectedPosterAtom);
  //nav
  const nav = useNavigate();
  //검사로직
  const { correctList, handleChange, isAnswer } = useForm(3);
  const { handlePayment, hasPayFormError, cardTypesError } = usePaymentValidate(
    { correctList }
  );
  //'신용카드'를 정확히 골랐을 경우 '결제 수단 입력' 창 생성
  const isPayMethodCorrect = correctList["PayMethodForm"];
  console.log(correctList);

  return (
    <PayMethodWrap>
      <PayMethodContainer>
        {/*결제 수단 */}
        <SubTtitle>결제 수단</SubTtitle>
        <span>실전모드에선 '신용카드' 결제만 가능합니다.</span>
        <span>실제 웹사이트는 더 다양한 결제 방식이 존재합니다.</span>
        <PayMethodForm
          isSelected={isPayMethodCorrect}
          handleChange={handleChange}
        />
        {/*사용 가능한 포인트 */}
        <UsablePoint />
      </PayMethodContainer>
      {/*결제 방식 */}
      <DetailPayFormContainer>
        {isPayMethodCorrect && (
          <>
            <SubTtitle>결제 방식</SubTtitle>
            <CardInfo>
              {">"} 신용카드 정보 <FakeButton>무이자 할부 안내</FakeButton>
            </CardInfo>
            <DetailPayForm
              isSelected={correctList["DetailPayForm"]}
              isAnswer={isAnswer}
              handleChange={handleChange}
              hasPayFormError={hasPayFormError}
              cardTypesError={cardTypesError}
            />
            <Info>
              ※현금영수증 발급 안내
              <br />
              <br />
              현금영수증은 PC에서만 발급 가능하며, "예매내역 상세" 및
              "마이페이지 {">"} 증빙서류 {">"} 현금영수증 메뉴"에서 신청할 수
              있습니다.
            </Info>
          </>
        )}
      </DetailPayFormContainer>

      {/*내 예매 정보 */}
      <div>
        <PosterInfo id={posterId} />
        <MyBookingInfoContainer>
          <MyBookingInfo />
          <PrevNextButton
            prevButtonOnClick={() => nav("../step3/step4")}
            nextButtonOnClick={handlePayment}
          />
        </MyBookingInfoContainer>
      </div>
    </PayMethodWrap>
  );
};
export default SelectPayMethodInterPark;
