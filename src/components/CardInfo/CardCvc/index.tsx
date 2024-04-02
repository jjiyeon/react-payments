import { useContext, useState } from 'react'
import { CardInfoContext, UpdateCardInfoContext } from '../../../context/paymentContext'
import { Input } from '../../common/Input'
import ui from '@/styles/index.module.css'
import PrivateNumber from '../PrivateNumber'

export const CardCvc = () => {
  const cardInfo = useContext(CardInfoContext)
  const updateCardInfo = useContext(UpdateCardInfoContext)

  const [onFocus, setOnFocus] = useState(false)
  const [privateKeypad, setprivateKeypad] = useState<{ key: string; isOpen: boolean }>({
    key: '',
    isOpen: false,
  }) // 키패드 컴포넌트

  //css 처리도 방법일듯..
  const handleMouseEnter = () => {
    setOnFocus(true)
  }
  const handleMouseLeave = () => {
    setOnFocus(false)
  }

  const handleInputChange = (key: string, value: string) => {
    return updateCardInfo({
      ...cardInfo,
      [key]: value,
    })
  }

  if (!cardInfo) return null
  return (
    <div className={`${ui['row-container']} ${ui['tooltip-align']}`}>
      <Input
        type="password"
        value={cardInfo.cvc || ''}
        onFocus={() => {
          if (!cardInfo.cvc) setprivateKeypad({ key: 'cvc', isOpen: true })
        }}
        readOnly={true}
        size="small"
        label="보안코드(CVC/CVV)"
      />
      <div className={`${ui['tooltip-wrapper']}`} onMouseOver={handleMouseEnter} onMouseOut={handleMouseLeave}>
        <span>?</span>
      </div>
      <p className={`${ui['tooltip']} ${ui[onFocus ? 'hover' : '']}`} style={{ fontSize: '12px' }}>
        카드 뒷면의 3자리를 입력해주세요.
      </p>

      {privateKeypad.isOpen && (
        <PrivateNumber
          length={3}
          callback={(e) => handleInputChange(privateKeypad.key, e)}
          close={() => setprivateKeypad((state) => ({ ...state, isOpen: false }))}
        />
      )}
    </div>
  )
}
