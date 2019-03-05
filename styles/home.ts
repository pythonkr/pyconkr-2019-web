import {css} from '@emotion/core'

export const homeCSS = css`
section.banner {
  height: 680px;
  background: #263056;
}

section.banner > div{
  padding-top: 255px;
}

section.schedule {
  max-width: 940px;
  margin: 0 auto;
  padding: 128px 0 116px 0;
}

section.schedule li {
  display: inline-block;
  list-style: none;
  width: 281px;
  margin: 0;
  padding: 0;
  vertical-align: top;
}

section.schedule li + li {
  margin-left: 48px;
}

section.schedule li > h2 {
  font-size: 30px;
  line-height: 39px;
  font-weight: bold;
}

section.schedule li > h3 {
  display: inline-block;
  margin-top: 10px;
  font-size: 20px;
  line-height: 39px;
  font-weight: bold;
}

section.schedule li > p {
  max-width: 85%;
  font-size: 15px;
  line-height: 1.8;
  color: #262626;
}

section.schedule li > span {
  font-size: 20px;
  line-height: 39px;
  font-weight: bold;
  color: #b4b4b4;
}

section.schedule li > hr {
  height: 1px;
  margin: 10px 0 17px 0;
  border: none;
  background: #fcb5b5;
}

section.schedule li > button.support {
  margin-top: 22px;
  width: 148px;
  height: 40px;
  border: solid 1px #263056;
  background-color: #354379;
  font-size: 14px;
  font-weight: bold;
  text-align: center;
  color: #ffffff;
  cursor: pointer;
  outline: none;
}

section.sponser {
  background-color: #fde5e3;
  padding: 15px 0;
}

section.sponser h2 {
  font-size: 36px;
  line-height: 1.8;
  font-weight: bold;
  text-align: center;
  color: #4a4a4a;
}

section.sponser p {
  margin: 32px 0 0;
  font-size: 17px;
  line-height: 1.88;
  color: #4a4a4a;
}

section.sponser p + p {
  margin: 20px 0 63px;
}

section.sponser button {
  display: block;
  max-width: 300px;
  width: 100%;
  height: 60px;
  margin: 0 auto;
  border: solid 2px #f95858;
  background: transparent;
  font-size: 18px;
  font-weight: bold;
  text-align: center;
  color: #f95858;
  cursor: pointer;
  outline: none;
}

section.introduce {
  padding: 92px 0 171px 0;
}

section.introduce h2 {
  font-size: 26px;
  font-weight: bold;
  line-height: 1.08;
  color: #263056;
}

section.introduce p {
  font-size: 17px;
  line-height: 1.88;
  color: #000000;
  margin-top: 30px;
}

section.introduce p + p {
  margin-top: 20px;
}

section.introduce hr {
  border: none;
  height: 1px;
  background: #f95858;
  width: 100%;
  margin: 40px auto 58px;
}
`
