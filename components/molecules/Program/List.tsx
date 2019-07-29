import { mobileWidth } from 'styles/layout'
import styled from '@emotion/styled'
import { CORAL, FORM_LABEL_GRAY, FORM_LABEL_GRAY_LIGHT, GREEN, TEAL, YELLOW } from 'styles/colors'
import { H1, H2, Ul, Li, Paragraph, Section } from 'components/atoms/ContentWrappers'
import Link from 'next/link'

export const TagWrapper = styled.div<{ isMinWidth?: boolean }>`
text-align: right;
padding-left: 10px;
min-width: ${props => props.isMinWidth ? '80px' : ''};
@media (max-width: ${mobileWidth}) {
  min-width: ${props => props.isMinWidth ? '60px' : ''};
}
`

export const Speaker = styled.span`
color: ${FORM_LABEL_GRAY};
font-weight: 700;
`

export const Tag = styled.span`
color: white;
font-size: 12px;
border-radius: 3px;

padding: 2px 4px;
opacity: .9;

background: ${GREEN};

&.beginner,
&.over10years {
  background: ${GREEN};
}

&.intermediate,
&.over13years {
  background: ${YELLOW};
}

&.experienced {
  background: ${CORAL};
}

`

// background: ${props => props.difficulty === '1'
//     ? GREEN
//     : props.difficulty === '2'
//       ? YELLOW
//       : CORAL
//   };



export const CategoryTitleWrapper = styled(H2)`
  display: flex;
  padding-top: 26px;
`

export const CategoryTitleText = styled.span`
  padding-right: 20px;
`

export const CategoryTitleDecorator = styled.span`
  display: block;
  position: relative;
  flex: 1;
  border-top: solid 1px rgba(8,132,135, .4);
  margin-top: 17px;
`

export const ProgramUl = styled(Ul)`
  padding-top: 2px;
  position: relative;
`

export const ProgramLi = styled(Li)`
  display: flex;
  justify-content: space-between;
  margin: 28px 0;
  font-size: 17px;

  @media (max-width: ${mobileWidth}) {
    padding-left: 20px;
    font-size: 16px;
  }

  ${ProgramUl} > & {
    &:before {
      content: '';
      position: absolute;
      width: 10px;
      height: 12px;
      left: 24px;
      top: 11px;
      background: url('data:image/svg+xml;utf8,<svg width="10" height="12" viewBox="0 0 14 16" xmlns="http://www.w3.org/2000/svg"><path fill="%23088487" d="M9.062 5.643L14 8l-4.938 2.358L7 16l-2.063-5.642L0 8l4.937-2.357L7 0z" fillRule="evenodd"/></svg>')
    }

    @media (max-width: ${mobileWidth}) {
      &:before {
        left: 0;
      }
    }
  }

  &:hover {
    a, ${Speaker} {
      color: ${TEAL};
    }
    ${Tag} {
      opacity: 1;
    }
  }

  & a {
    text-decoration-color: ${FORM_LABEL_GRAY_LIGHT};
    font-weight: 700;
    margin-right: 14px;
  }

  & ${Paragraph} {
    margin: 5px 0;
  }
`

export const DifficultyTag = (props) => {
  const { difficulty } = props
  if (!difficulty) return null

  return (
    <TagWrapper isMinWidth>
      <Tag className={difficulty.nameEn.replace(/ /gi, '').toLowerCase()}>{difficulty.name}</Tag>
    </TagWrapper>
  )
}

export const ProgramItem = (props) => {
  const { href, name, speakerName, difficulty } = props
  return (
    <ProgramLi>
      <div style={{ lineHeight: 1.8 }}>
        <Link href={ href }>
          <a>{ name }</a>
        </Link>
        <Speaker>{ speakerName }</Speaker>
      </div>
      <DifficultyTag difficulty={difficulty} />
    </ProgramLi>
  )
}