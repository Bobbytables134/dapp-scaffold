import {FC, useEffect, useState} from "react";
import { QuantityPicker } from 'react-qty-picker';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserAstronaut, faGear, faCircleArrowLeft, faCircleArrowRight, faDumbbell, faGun, faGaugeHigh, faShieldHalved, faBatteryThreeQuarters } from "@fortawesome/free-solid-svg-icons";
import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'
config.autoAddCss = false

export const Armory: FC = ({ }) => {

  const [state, setState] = useState({
    strengthPickerValue: 0,
    firepowerPickerValue: 0,
    speedPickerValue: 0,
    shieldPickerValue: 0,
    ammoPickerValue: 0,
    totalValue: 0
  });

  const getTotalValue = function () {
    const totalValueOfPickers = state.strengthPickerValue + state.firepowerPickerValue + state.speedPickerValue + state.shieldPickerValue + state.ammoPickerValue
    setState({
      ...state,
      totalValue: totalValueOfPickers
    })
  }

  const getPickerValue = (value, picker) =>{
    setState({
      ...state,
      [picker]: value
    })
  }

  useEffect(() => {
   getTotalValue();
  }, [state.strengthPickerValue, state.firepowerPickerValue, state.speedPickerValue, state.shieldPickerValue, state.ammoPickerValue])

  return (
<div className="md:hero mx-auto p-4">
      <div className="md:hero-content flex flex-col">
        <h1 className="text-center text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-tr from-[#9945FF] to-[#14F195]">
          The Armory
        </h1>
        <h3>Upgrade your SolGats soldier strength, speed, and more. Prepare for battle anon!</h3>
        <div className="choose-solgat">
          <h3><FontAwesomeIcon icon={faUserAstronaut} />Choose your SolGat</h3>
          <div className="choose-solgat-container">
            <a href="#"><FontAwesomeIcon icon={faCircleArrowLeft} /></a>
            <a className="solgat-nft" href=""><img src="../../SolGat-NFT-01.jpeg"></img></a>
            <a className="solgat-nft" href=""><img src="../../SolGat-NFT-02.jpeg"></img></a>
            <a className="solgat-nft-placeholder" href=""><div className="placeholder-nft"></div></a>
            <a className="solgat-nft-placeholder" href=""><div className="placeholder-nft"></div></a>
            <a className="solgat-nft-placeholder" href=""><div className="placeholder-nft"></div></a>
            <a className="solgat-nft-placeholder" href=""><div className="placeholder-nft"></div></a>
            <a className="solgat-nft-placeholder" href=""><div className="placeholder-nft"></div></a>
            <a className="solgat-nft-placeholder" href=""><div className="placeholder-nft"></div></a>
            <a href="#"><FontAwesomeIcon icon={faCircleArrowRight} /></a>
          </div>
        </div>
        <div className="rank-container">
          <h3><FontAwesomeIcon icon={faGear} />Upgrade Your Rank</h3>
          <div className="loaded-nft">
            <img src="../../SolGat-NFT-01.jpeg"></img>
          </div>
          <div className="upgradeables">
            <table>
              <thead>
                <tr>
                  <th>Items</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><FontAwesomeIcon icon={faDumbbell} />Upgrade Strength</td>
                  <td>100 $PEW</td>
                  <td><QuantityPicker smooth min={0} max={5} value={0} onChange={(value)=>{getPickerValue(value,"strengthPickerValue")}} /></td>
                  <td>{state.strengthPickerValue * 100} $PEW</td>
                </tr>
                <tr>
                  <td><FontAwesomeIcon icon={faGun} /> Upgrade Firepower</td>
                  <td>100 $PEW</td>
                  <td><QuantityPicker smooth min={0} max={5} onChange={(value)=>{getPickerValue(value,"firepowerPickerValue")}}/></td>
                  <td>{state.firepowerPickerValue * 100} $PEW</td>
                </tr>
                <tr>
                  <td><FontAwesomeIcon icon={faGaugeHigh} /> Upgrade Speed</td>
                  <td>100 $PEW</td>
                  <td><QuantityPicker smooth min={0} max={5} onChange={(value)=>{getPickerValue(value,"speedPickerValue")}} /></td>
                  <td>{state.speedPickerValue * 100} $PEW</td>
                </tr>
                <tr>
                  <td><FontAwesomeIcon icon={faShieldHalved} />Upgrade Shield</td>
                  <td>100 $PEW</td>
                  <td><QuantityPicker smooth min={0} max={5} onChange={(value)=>{getPickerValue(value,"shieldPickerValue")}} /></td>
                  <td>{state.shieldPickerValue * 100} $PEW</td>
                </tr>
                <tr>
                  <td><FontAwesomeIcon icon={faBatteryThreeQuarters} />Upgrade Ammo</td>
                  <td>100 $PEW</td>
                  <td><QuantityPicker smooth min={0} max={5} onChange={(value)=>{getPickerValue(value,"ammoPickerValue")}}/></td>
                  <td>{state.ammoPickerValue * 100} $PEW</td>
                </tr>
                <tr>
                </tr>
              </tbody>
            </table>
            <div style={{ float: 'right' }}>
              <hr
                  style={{
                    color: 'white',
                    backgroundColor: 'white',
                    height: 5,
                    marginTop: 25
                  }}
              />
              <h3 style={{ textAlign: 'right' }}>{state.totalValue * 100} $PEW</h3>
              <button  className="group w-60 m-2 btn animate-pulse disabled:animate-none bg-gradient-to-r from-[#9945FF] to-[#14F195] hover:from-pink-500 hover:to-yellow-500 ...">Submit Transaction</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
