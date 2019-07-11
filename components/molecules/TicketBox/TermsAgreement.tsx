import styled from '@emotion/styled'
import i18next from 'i18next'
import * as React from 'react'
import { paths } from 'routes/paths'
import { mobileWidth } from 'styles/layout'

type PropsType = {
    t: i18next.TFunction;
    title: string;
    id: string;
    isTermsAgreed: boolean;
    onCancel(): void;
    onChangeAgreed(isAgree: boolean): void;
}

const TicketInformationWrapper = styled.div`
  flex: 2;
  display: flex;
  flex-direction: column;
  padding: 32px 0 20px 28px;

  h1 {
    font-size: 26px;
    font-weight: bold;
    margin-bottom: 23px;
  }

  p.guide {
    font-size: 14px;
    color: #878d91;
  }

  select {
    margin: 5px 0 29px 0;
    width: 80%;
    height: 54px;
    border-radius: 4px;
    box-shadow: 0 1px 1px 0 rgba(0, 0, 0, 0.07);
    border: solid 1px #ced3d6;
    background-color: #f8fafb;
    font-size: 14px;
  }

  input[type=text] {
    width: 80%;
    height: 54px;
    border-radius: 4px;
    border: solid 1px #ced3d6;
    margin: 5px 0 29px 0;
    background-color: #ffffff;
    padding: 17px 21px;
    font-size: 17px;
  }

  input[type=checkbox] {
    margin: 3px 3px 3px 0;
  }

  p.terms {
    font-size: 15px;
    line-height: 1.67;
    // color: #088487;

    a {
      font-weight: 800;
    }
  }

  p.agreement {
    font-size: 14px;
    line-height: 1.29;
    color: #4d5256;
    margin-top: 10px;
    margin-bottom: 25px;
  }

  button.back {
    margin-top: auto;
    margin-right: auto;
    width: 86px;
    height: 53px;
    border: solid 1px;
    font-size: 18px;
  }

  @media (max-width: ${mobileWidth}) {
    display: block;
    padding: 29px 28px;

    h1 {
      margin-bottom: 35px;
    }

    select {
      width: 100%;
    }

    button.back {
      background-color: #FFF;
      width: 100%;
    }
  }
`

class TermsAgreement extends React.Component<PropsType> {
    render() {
        const { title, id, onCancel, isTermsAgreed, onChangeAgreed } = this.props
        const { t } = this.props
        const isLanguageKorean = i18next.language === 'ko'
        const cocLink = isLanguageKorean ? paths.coc : `${paths.coc}?lang=en-US`

        return (
            <TicketInformationWrapper>
                <h1>{title}</h1>
                <p className='terms'><a target='_blank' rel='noopener noreferrer' href={cocLink}>{`[${t('constant:pyconKorea.nameOnly')} ${t('common:coc')}]`}</a></p>
                <p className='terms'>{t('ticket:terms')}</p>
                <p className='agreement'>
                  <input
                    type='checkbox'
                    id={`terms-option-${id}`}
                    aria-checked={true}
                    style={{ verticalAlign: 'top' }}
                    checked={isTermsAgreed}
                    onChange={e => onChangeAgreed(e.target.checked)}
                  />
                  <label htmlFor={`terms-option-${id}`}>{t('ticket:agreeToTerms')}</label>
                </p>
                <button className='back' onClick={onCancel}>&lt; {t('ticket:back')}</button>
            </TicketInformationWrapper>
        )
    }
}

export default TermsAgreement
