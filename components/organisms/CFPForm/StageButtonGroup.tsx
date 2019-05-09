import { Button } from 'components/atoms/Button'
import { FlexSpaceBetweenWrapper } from 'components/atoms/FlexWrapper'
import { TEAL } from 'styles/colors'

type Props = {
  onPrev(): void;
  onSave(): void;
  isSubmit: boolean;
}

export const StageButtonGroup: React.SFC<Props> = ({ onPrev, onSave, isSubmit }) => {

  const submitButtonItnlKey = !isSubmit
    ? 'contribute.talkProposal.application.stages.stages2.button3'
    : 'contribute.talkProposal.application.stages.stages2.button4'
  const submitMessage = !isSubmit
    ? '다음'
    : '제출'

  return (
    <FlexSpaceBetweenWrapper style={{ marginTop: 60 }}>
      <Button
        tag='button'
        type='button'
        intlKey='contribute.talkProposal.application.stages.stages2.button1'
        color={TEAL}
        width={80}
        primary={false}
        onClick={onPrev}
      >이전</Button>
      <FlexSpaceBetweenWrapper>
        <Button
          tag='button'
          type='button'
          intlKey='contribute.talkProposal.application.stages.stages2.button2'
          color={TEAL}
          width={80}
          primary={false}
          onClick={onSave}
        >임시 저장</Button>
        <Button
          tag='button'
          type='submit'
          intlKey={submitButtonItnlKey}
          color={TEAL}
          width={80}
          style={{ marginLeft: 10 }}
        >{submitMessage}</Button>
      </FlexSpaceBetweenWrapper>
    </FlexSpaceBetweenWrapper>
  )}
