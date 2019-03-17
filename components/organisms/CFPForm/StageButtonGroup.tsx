import { Button } from 'components/atoms/Button'
import { FlexSpaceBetweenWrapper } from 'components/atoms/FlexWrapper'
import { TEAL } from 'styles/colors'

type Props = {
  onPrev: VoidFunction;
  onSave: VoidFunction;
}

export const StageButtonGroup: React.SFC<Props> = ({ onPrev, onSave }) => {
  return <FlexSpaceBetweenWrapper style={{ marginTop: 80 }}>
    <Button
      tag='button'
      type='button'
      intlKey='adsfasdfa'
      color={TEAL}
      width={120}
      primary={false}
      onClick={onPrev}
    >이전</Button>
    <div>
      <Button
        tag='button'
        type='button'
        intlKey='adsfasdfa'
        color={TEAL}
        width={120}
        primary={false}
        onClick={onSave}
      >임시 저장</Button>
      <Button
        tag='button'
        type='submit'
        intlKey='adsfasdfa'
        color={TEAL}
        width={120}
        style={{ marginLeft: 10 }}
      >다음</Button>
    </div>
  </FlexSpaceBetweenWrapper>
}
