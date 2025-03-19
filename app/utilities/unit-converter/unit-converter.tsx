"use client"

import { useState, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

// 定义单位转换规则
const unitTypes = {
  length: {
    name: "长度",
    units: {
      mm: { name: "毫米", ratio: 1 },
      cm: { name: "厘米", ratio: 10 },
      dm: { name: "分米", ratio: 100 },
      m: { name: "米", ratio: 1000 },
      km: { name: "千米", ratio: 1000000 },
      inch: { name: "英寸", ratio: 25.4 },
      ft: { name: "英尺", ratio: 304.8 },
      yd: { name: "码", ratio: 914.4 },
      mile: { name: "英里", ratio: 1609344 },
    }
  },
  weight: {
    name: "质量",
    units: {
      mg: { name: "毫克", ratio: 1 },
      g: { name: "克", ratio: 1000 },
      kg: { name: "千克", ratio: 1000000 },
      t: { name: "吨", ratio: 1000000000 },
      oz: { name: "盎司", ratio: 28349.5 },
      lb: { name: "磅", ratio: 453592 },
      grain: { name: "格令", ratio: 64.79891 },
    }
  },
  temperature: {
    name: "温度",
    units: {
      c: { name: "摄氏度", ratio: 1 },
      f: { name: "华氏度", ratio: 1 },
      k: { name: "开尔文", ratio: 1 },
    }
  },
  area: {
    name: "面积",
    units: {
      mm2: { name: "平方毫米", ratio: 1 },
      cm2: { name: "平方厘米", ratio: 100 },
      dm2: { name: "平方分米", ratio: 10000 },
      m2: { name: "平方米", ratio: 1000000 },
      a: { name: "公亩", ratio: 100000000 },
      ha: { name: "公顷", ratio: 10000000000 },
      km2: { name: "平方千米", ratio: 1000000000000 },
      acre: { name: "英亩", ratio: 40468564224 },
      sqft: { name: "平方英尺", ratio: 92903.04 },
    }
  },
  volume: {
    name: "体积",
    units: {
      mm3: { name: "立方毫米", ratio: 1 },
      cm3: { name: "立方厘米", ratio: 1000 },
      ml: { name: "毫升", ratio: 1000 },
      l: { name: "升", ratio: 1000000 },
      m3: { name: "立方米", ratio: 1000000000 },
      gallon: { name: "加仑", ratio: 3785411.784 },
      floz: { name: "液量盎司", ratio: 29573.5295625 },
    }
  },
  time: {
    name: "时间",
    units: {
      ms: { name: "毫秒", ratio: 1 },
      s: { name: "秒", ratio: 1000 },
      min: { name: "分钟", ratio: 60000 },
      h: { name: "小时", ratio: 3600000 },
      day: { name: "天", ratio: 86400000 },
      week: { name: "周", ratio: 604800000 },
      month: { name: "月(30天)", ratio: 2592000000 },
      year: { name: "年(365天)", ratio: 31536000000 },
    }
  },
  speed: {
    name: "速度",
    units: {
      mps: { name: "米/秒", ratio: 1 },
      kmph: { name: "千米/时", ratio: 0.277778 },
      mph: { name: "英里/时", ratio: 0.44704 },
      kn: { name: "节", ratio: 0.514444 },
    }
  },
  pressure: {
    name: "压力",
    units: {
      pa: { name: "帕斯卡", ratio: 1 },
      kpa: { name: "千帕", ratio: 1000 },
      mpa: { name: "兆帕", ratio: 1000000 },
      atm: { name: "标准大气压", ratio: 101325 },
      mmhg: { name: "毫米汞柱", ratio: 133.322 },
      bar: { name: "巴", ratio: 100000 },
      psi: { name: "磅/平方英寸", ratio: 6894.76 },
    }
  },
  energy: {
    name: "能量",
    units: {
      j: { name: "焦耳", ratio: 1 },
      kj: { name: "千焦", ratio: 1000 },
      cal: { name: "卡路里", ratio: 4.184 },
      kcal: { name: "千卡", ratio: 4184 },
      wh: { name: "瓦时", ratio: 3600 },
      kwh: { name: "千瓦时", ratio: 3600000 },
      ev: { name: "电子伏", ratio: 1.602176634e-19 },
    }
  },
  power: {
    name: "功率",
    units: {
      w: { name: "瓦特", ratio: 1 },
      kw: { name: "千瓦", ratio: 1000 },
      mw: { name: "兆瓦", ratio: 1000000 },
      hp: { name: "马力", ratio: 745.7 },
    }
  },
  data: {
    name: "数据存储",
    units: {
      bit: { name: "比特", ratio: 1 },
      byte: { name: "字节", ratio: 8 },
      kb: { name: "千字节", ratio: 8192 },
      mb: { name: "兆字节", ratio: 8388608 },
      gb: { name: "吉字节", ratio: 8589934592 },
      tb: { name: "太字节", ratio: 8796093022208 },
    }
  },
  angle: {
    name: "角度",
    units: {
      deg: { name: "度", ratio: 1 },
      rad: { name: "弧度", ratio: 57.29578 },
      grad: { name: "百分度", ratio: 0.9 },
      min: { name: "分", ratio: 0.016667 },
      sec: { name: "秒", ratio: 0.000278 },
    }
  },
  frequency: {
    name: "频率",
    units: {
      hz: { name: "赫兹", ratio: 1 },
      khz: { name: "千赫兹", ratio: 1000 },
      mhz: { name: "兆赫兹", ratio: 1000000 },
      ghz: { name: "吉赫兹", ratio: 1000000000 },
    }
  },
  concentration: {
    name: "浓度",
    units: {
      molL: { name: "摩尔/升", ratio: 1 },
      mmolL: { name: "毫摩尔/升", ratio: 0.001 },
      umolL: { name: "微摩尔/升", ratio: 0.000001 },
      mgdL: { name: "毫克/分升", ratio: 0.0001 },
      ppm: { name: "百万分率", ratio: 0.000001 },
      ppb: { name: "十亿分率", ratio: 0.000000001 },
    }
  },
}

type UnitKey = keyof typeof unitTypes

export function UnitConverter() {
  const [unitType, setUnitType] = useState<UnitKey>('length')
  const [inputValue, setInputValue] = useState<string>('')
  const [results, setResults] = useState<{[key: string]: string}>({})
  const [fromUnit, setFromUnit] = useState<string>('m')

  // 温度特殊转换
  const convertTemperature = (value: number, from: string, to: string) => {
    let celsius: number

    // 先转换为摄氏度
    switch (from) {
      case 'f':
        celsius = (value - 32) * 5/9
        break
      case 'k':
        celsius = value - 273.15
        break
      default:
        celsius = value
    }

    // 从摄氏度转换为目标单位
    switch (to) {
      case 'f':
        return celsius * 9/5 + 32
      case 'k':
        return celsius + 273.15
      default:
        return celsius
    }
  }

  // 当输入值或单位类型改变时，计算所有转换结果
  useEffect(() => {
    if (!inputValue || isNaN(parseFloat(inputValue))) {
      setResults({})
      return
    }

    const value = parseFloat(inputValue)
    const newResults: {[key: string]: string} = {}
    const units = unitTypes[unitType].units as Record<string, {name: string, ratio: number}>
    
    if (!(fromUnit in units)) {
      return
    }

    if (unitType === 'temperature') {
      // 温度特殊处理
      Object.keys(units).forEach(toUnit => {
        const result = convertTemperature(value, fromUnit, toUnit)
        newResults[toUnit] = result.toFixed(2)
      })
    } else {
      // 其他单位通过比例转换
      const fromRatio = units[fromUnit].ratio
      
      Object.keys(units).forEach(toUnit => {
        const toRatio = units[toUnit].ratio
        const result = (value * fromRatio) / toRatio
        newResults[toUnit] = result.toFixed(4)
      })
    }

    setResults(newResults)
  }, [inputValue, unitType, fromUnit])

  const renderInputOptions = () => {
    return (
      <div className="space-y-4">
        <div>
          <Label>单位类型</Label>
          <div className="grid grid-cols-3 gap-2 mt-2">
            {Object.entries(unitTypes).map(([key, type]) => (
              <button
                key={key}
                onClick={() => {
                  setUnitType(key as UnitKey)
                  // 重置单位选择
                  const firstUnit = Object.keys(unitTypes[key as UnitKey].units)[0]
                  setFromUnit(firstUnit)
                }}
                className={`py-2 px-3 rounded-md text-sm ${
                  unitType === key 
                    ? 'bg-orange-100 text-orange-700 font-medium' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {type.name}
              </button>
            ))}
          </div>
        </div>

        <div>
          <Label>输入值</Label>
          <div className="flex mt-2">
            <Input
              type="number"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="请输入数值"
              className="rounded-r-none"
            />
            <select
              value={fromUnit}
              onChange={(e) => setFromUnit(e.target.value)}
              className="bg-gray-100 border border-gray-300 rounded-r-md px-3 border-l-0"
            >
              {Object.entries(unitTypes[unitType].units as Record<string, {name: string, ratio: number}>).map(([key, unit]) => (
                <option key={key} value={key}>{unit.name}</option>
              ))}
            </select>
          </div>
        </div>
      </div>
    )
  }

  const renderResult = () => {
    if (Object.keys(results).length === 0) {
      return (
        <div className="text-center text-gray-500">
          请输入有效的数值
        </div>
      )
    }

    const units = unitTypes[unitType].units as Record<string, {name: string, ratio: number}>

    return (
      <div className="space-y-4">
        <div className="p-4 bg-orange-50 rounded-lg">
          <div className="text-lg font-semibold text-orange-600 mb-2">
            转换结果
          </div>
          <div className="space-y-2">
            {Object.entries(results).map(([unit, value]) => (
              <div key={unit} className={`flex justify-between items-center p-2 rounded ${fromUnit === unit ? 'bg-orange-100' : ''}`}>
                <span className="text-gray-700">{units[unit].name}:</span>
                <span className="font-medium">{value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return {
    renderInputOptions,
    renderResult
  }
}