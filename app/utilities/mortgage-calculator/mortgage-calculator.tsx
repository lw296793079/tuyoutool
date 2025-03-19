"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export function MortgageCalculator() {
  const [loanAmount, setLoanAmount] = useState<string>('')
  const [loanYears, setLoanYears] = useState<string>('')
  const [interestRate, setInterestRate] = useState<string>('')
  const [fundAmount, setFundAmount] = useState<string>('')
  const [fundRate, setFundRate] = useState<string>('')
  const [loanType, setLoanType] = useState('commercial') // commercial:商业贷款 fund:公积金贷款 mixed:组合贷款
  const [paymentMethod, setPaymentMethod] = useState('equal') // equal:等额本息 principal:等额本金
  const [calculationType, setCalculationType] = useState('new') // new:新贷款 existing:已有贷款
  const [paidMonths, setPaidMonths] = useState<string>('') // 已还款月数

  // 计算月供
  const calculateMonthlyPayment = () => {
    if (loanType === 'mixed') {
      // 组合贷款计算
      const commercialPrincipal = parseFloat(loanAmount) * 10000 // 商贷部分
      const fundPrincipal = parseFloat(fundAmount) * 10000 // 公积金部分
      const months = parseInt(loanYears) * 12
      const commercialMonthlyRate = parseFloat(interestRate) / 100 / 12
      const fundMonthlyRate = parseFloat(fundRate) / 100 / 12
      
      if (paymentMethod === 'equal') {
        // 等额本息
        const commercialMonthlyPayment = commercialPrincipal * commercialMonthlyRate * Math.pow(1 + commercialMonthlyRate, months) / 
                                (Math.pow(1 + commercialMonthlyRate, months) - 1)
        const fundMonthlyPayment = fundPrincipal * fundMonthlyRate * Math.pow(1 + fundMonthlyRate, months) / 
                                (Math.pow(1 + fundMonthlyRate, months) - 1)
        
        const totalMonthlyPayment = commercialMonthlyPayment + fundMonthlyPayment
        const totalPayment = totalMonthlyPayment * months
        const totalPrincipal = commercialPrincipal + fundPrincipal
        const totalInterest = totalPayment - totalPrincipal

        // 如果是已有贷款计算
        if (calculationType === 'existing' && paidMonths) {
          const paidMonthsNum = parseInt(paidMonths)
          
          // 计算已还本金和利息
          let paidCommercialPrincipal = 0
          let paidCommercialInterest = 0
          let paidFundPrincipal = 0
          let paidFundInterest = 0
          
          for (let i = 1; i <= paidMonthsNum; i++) {
            // 商业贷款
            const commercialInterest = (commercialPrincipal - paidCommercialPrincipal) * commercialMonthlyRate
            const commercialPrincipalPaid = commercialMonthlyPayment - commercialInterest
            paidCommercialPrincipal += commercialPrincipalPaid
            paidCommercialInterest += commercialInterest
            
            // 公积金贷款
            const fundInterest = (fundPrincipal - paidFundPrincipal) * fundMonthlyRate
            const fundPrincipalPaid = fundMonthlyPayment - fundInterest
            paidFundPrincipal += fundPrincipalPaid
            paidFundInterest += fundInterest
          }
          
          const paidTotalPrincipal = paidCommercialPrincipal + paidFundPrincipal
          const paidTotalInterest = paidCommercialInterest + paidFundInterest
          const remainingPrincipal = totalPrincipal - paidTotalPrincipal
          const remainingInterest = totalInterest - paidTotalInterest
          const remainingMonths = months - paidMonthsNum
          
          return {
            monthlyPayment: totalMonthlyPayment.toFixed(2),
            commercialMonthly: commercialMonthlyPayment.toFixed(2),
            fundMonthly: fundMonthlyPayment.toFixed(2),
            totalPayment: totalPayment.toFixed(2),
            totalInterest: totalInterest.toFixed(2),
            paidPrincipal: paidTotalPrincipal.toFixed(2),
            paidInterest: paidTotalInterest.toFixed(2),
            remainingPrincipal: remainingPrincipal.toFixed(2),
            remainingInterest: remainingInterest.toFixed(2),
            remainingMonths: remainingMonths,
            remainingYears: (remainingMonths / 12).toFixed(1)
          }
        }

        return {
          monthlyPayment: totalMonthlyPayment.toFixed(2),
          commercialMonthly: commercialMonthlyPayment.toFixed(2),
          fundMonthly: fundMonthlyPayment.toFixed(2),
          totalPayment: totalPayment.toFixed(2),
          totalInterest: totalInterest.toFixed(2)
        }
      } else {
        // 等额本金
        const commercialMonthlyPrincipal = commercialPrincipal / months
        const fundMonthlyPrincipal = fundPrincipal / months
        
        const commercialFirstMonth = commercialMonthlyPrincipal + commercialPrincipal * commercialMonthlyRate
        const fundFirstMonth = fundMonthlyPrincipal + fundPrincipal * fundMonthlyRate
        
        const commercialLastMonth = commercialMonthlyPrincipal + commercialMonthlyPrincipal * commercialMonthlyRate
        const fundLastMonth = fundMonthlyPrincipal + fundMonthlyPrincipal * fundMonthlyRate
        
        const commercialInterest = ((commercialFirstMonth + commercialLastMonth) * months / 2) - commercialPrincipal
        const fundInterest = ((fundFirstMonth + fundLastMonth) * months / 2) - fundPrincipal
        
        const totalFirstMonth = commercialFirstMonth + fundFirstMonth
        const totalLastMonth = commercialLastMonth + fundLastMonth
        const totalInterest = commercialInterest + fundInterest
        const totalPrincipal = commercialPrincipal + fundPrincipal
        const totalPayment = totalPrincipal + totalInterest

        // 如果是已有贷款计算
        if (calculationType === 'existing' && paidMonths) {
          const paidMonthsNum = parseInt(paidMonths)
          
          // 已还本金
          const paidCommercialPrincipal = commercialMonthlyPrincipal * paidMonthsNum
          const paidFundPrincipal = fundMonthlyPrincipal * paidMonthsNum
          const paidTotalPrincipal = paidCommercialPrincipal + paidFundPrincipal
          
          // 已还利息
          let paidCommercialInterest = 0
          let paidFundInterest = 0
          
          for (let i = 1; i <= paidMonthsNum; i++) {
            const remainingCommercialPrincipal = commercialPrincipal - commercialMonthlyPrincipal * (i - 1)
            const remainingFundPrincipal = fundPrincipal - fundMonthlyPrincipal * (i - 1)
            
            paidCommercialInterest += remainingCommercialPrincipal * commercialMonthlyRate
            paidFundInterest += remainingFundPrincipal * fundMonthlyRate
          }
          
          const paidTotalInterest = paidCommercialInterest + paidFundInterest
          const remainingPrincipal = totalPrincipal - paidTotalPrincipal
          const remainingInterest = totalInterest - paidTotalInterest
          const remainingMonths = months - paidMonthsNum
          
          // 当前月供
          const currentCommercialMonthly = commercialMonthlyPrincipal + (commercialPrincipal - paidCommercialPrincipal) * commercialMonthlyRate
          const currentFundMonthly = fundMonthlyPrincipal + (fundPrincipal - paidFundPrincipal) * fundMonthlyRate
          const currentMonthly = currentCommercialMonthly + currentFundMonthly
          
          return {
            firstMonthPayment: totalFirstMonth.toFixed(2),
            lastMonthPayment: totalLastMonth.toFixed(2),
            monthlyPrincipal: (commercialMonthlyPrincipal + fundMonthlyPrincipal).toFixed(2),
            totalInterest: totalInterest.toFixed(2),
            totalPayment: totalPayment.toFixed(2),
            commercialFirstMonth: commercialFirstMonth.toFixed(2),
            fundFirstMonth: fundFirstMonth.toFixed(2),
            paidPrincipal: paidTotalPrincipal.toFixed(2),
            paidInterest: paidTotalInterest.toFixed(2),
            remainingPrincipal: remainingPrincipal.toFixed(2),
            remainingInterest: remainingInterest.toFixed(2),
            remainingMonths: remainingMonths,
            remainingYears: (remainingMonths / 12).toFixed(1),
            currentMonthly: currentMonthly.toFixed(2)
          }
        }

        return {
          firstMonthPayment: totalFirstMonth.toFixed(2),
          lastMonthPayment: totalLastMonth.toFixed(2),
          monthlyPrincipal: (commercialMonthlyPrincipal + fundMonthlyPrincipal).toFixed(2),
          totalInterest: totalInterest.toFixed(2),
          totalPayment: totalPayment.toFixed(2),
          commercialFirstMonth: commercialFirstMonth.toFixed(2),
          fundFirstMonth: fundFirstMonth.toFixed(2)
        }
      }
    } else {
      // 单一贷款计算
      const principal = parseFloat(loanAmount) * 10000 // 转换为元
      const months = parseInt(loanYears) * 12
      const monthlyRate = parseFloat(interestRate) / 100 / 12

      if (paymentMethod === 'equal') {
        // 等额本息
        const monthlyPayment = principal * monthlyRate * Math.pow(1 + monthlyRate, months) / 
                              (Math.pow(1 + monthlyRate, months) - 1)
        const totalPayment = monthlyPayment * months
        const totalInterest = totalPayment - principal

        // 如果是已有贷款计算
        if (calculationType === 'existing' && paidMonths) {
          const paidMonthsNum = parseInt(paidMonths)
          
          // 计算已还本金和利息
          let paidPrincipal = 0
          let paidInterest = 0
          
          for (let i = 1; i <= paidMonthsNum; i++) {
            const interest = (principal - paidPrincipal) * monthlyRate
            const principalPaid = monthlyPayment - interest
            paidPrincipal += principalPaid
            paidInterest += interest
          }
          
          const remainingPrincipal = principal - paidPrincipal
          const remainingInterest = totalInterest - paidInterest
          const remainingMonths = months - paidMonthsNum
          
          return {
            monthlyPayment: monthlyPayment.toFixed(2),
            totalPayment: totalPayment.toFixed(2),
            totalInterest: totalInterest.toFixed(2),
            paidPrincipal: paidPrincipal.toFixed(2),
            paidInterest: paidInterest.toFixed(2),
            remainingPrincipal: remainingPrincipal.toFixed(2),
            remainingInterest: remainingInterest.toFixed(2),
            remainingMonths: remainingMonths,
            remainingYears: (remainingMonths / 12).toFixed(1)
          }
        }

        return {
          monthlyPayment: monthlyPayment.toFixed(2),
          totalPayment: totalPayment.toFixed(2),
          totalInterest: totalInterest.toFixed(2)
        }
      } else {
        // 等额本金
        const monthlyPrincipal = principal / months
        const firstMonthPayment = monthlyPrincipal + principal * monthlyRate
        const lastMonthPayment = monthlyPrincipal + monthlyPrincipal * monthlyRate
        const totalInterest = ((firstMonthPayment + lastMonthPayment) * months / 2) - principal
        const totalPayment = principal + totalInterest

        // 如果是已有贷款计算
        if (calculationType === 'existing' && paidMonths) {
          const paidMonthsNum = parseInt(paidMonths)
          
          // 已还本金
          const paidPrincipal = monthlyPrincipal * paidMonthsNum
          
          // 已还利息
          let paidInterest = 0
          for (let i = 1; i <= paidMonthsNum; i++) {
            const remainingPrincipal = principal - monthlyPrincipal * (i - 1)
            paidInterest += remainingPrincipal * monthlyRate
          }
          
          const remainingPrincipal = principal - paidPrincipal
          const remainingInterest = totalInterest - paidInterest
          const remainingMonths = months - paidMonthsNum
          
          // 当前月供
          const currentMonthly = monthlyPrincipal + remainingPrincipal * monthlyRate
          
          return {
            firstMonthPayment: firstMonthPayment.toFixed(2),
            lastMonthPayment: lastMonthPayment.toFixed(2),
            monthlyPrincipal: monthlyPrincipal.toFixed(2),
            totalInterest: totalInterest.toFixed(2),
            totalPayment: totalPayment.toFixed(2),
            paidPrincipal: paidPrincipal.toFixed(2),
            paidInterest: paidInterest.toFixed(2),
            remainingPrincipal: remainingPrincipal.toFixed(2),
            remainingInterest: remainingInterest.toFixed(2),
            remainingMonths: remainingMonths,
            remainingYears: (remainingMonths / 12).toFixed(1),
            currentMonthly: currentMonthly.toFixed(2)
          }
        }

        return {
          firstMonthPayment: firstMonthPayment.toFixed(2),
          lastMonthPayment: lastMonthPayment.toFixed(2),
          monthlyPrincipal: monthlyPrincipal.toFixed(2),
          totalInterest: totalInterest.toFixed(2),
          totalPayment: (principal + totalInterest).toFixed(2)
        }
      }
    }
  }

  const renderInputOptions = () => {
    return (
      <div className="space-y-4">
        <div>
          <Label>计算类型</Label>
          <div className="flex gap-4 mt-2">
            <div className="flex items-center space-x-2">
              <input 
                type="radio" 
                id="new" 
                name="calculationType"
                value="new"
                checked={calculationType === 'new'}
                onChange={(e) => setCalculationType(e.target.value)}
              />
              <Label htmlFor="new">新贷款计算</Label>
            </div>
            <div className="flex items-center space-x-2">
              <input 
                type="radio" 
                id="existing" 
                name="calculationType"
                value="existing"
                checked={calculationType === 'existing'}
                onChange={(e) => setCalculationType(e.target.value)}
              />
              <Label htmlFor="existing">已有贷款计算</Label>
            </div>
          </div>
        </div>

        <div>
          <Label>贷款类型</Label>
          <div className="flex gap-4 mt-2">
            <div className="flex items-center space-x-2">
              <input 
                type="radio" 
                id="commercial" 
                name="loanType"
                value="commercial"
                checked={loanType === 'commercial'}
                onChange={(e) => setLoanType(e.target.value)}
              />
              <Label htmlFor="commercial">商业贷款</Label>
            </div>
            <div className="flex items-center space-x-2">
              <input 
                type="radio" 
                id="fund" 
                name="loanType"
                value="fund"
                checked={loanType === 'fund'}
                onChange={(e) => setLoanType(e.target.value)}
              />
              <Label htmlFor="fund">公积金贷款</Label>
            </div>
            <div className="flex items-center space-x-2">
              <input 
                type="radio" 
                id="mixed" 
                name="loanType"
                value="mixed"
                checked={loanType === 'mixed'}
                onChange={(e) => setLoanType(e.target.value)}
              />
              <Label htmlFor="mixed">组合贷款</Label>
            </div>
          </div>
        </div>

        <div>
          <Label>还款方式</Label>
          <div className="flex gap-4 mt-2">
            <div className="flex items-center space-x-2">
              <input 
                type="radio" 
                id="equal" 
                name="paymentMethod"
                value="equal"
                checked={paymentMethod === 'equal'}
                onChange={(e) => setPaymentMethod(e.target.value)}
              />
              <Label htmlFor="equal">等额本息</Label>
            </div>
            <div className="flex items-center space-x-2">
              <input 
                type="radio" 
                id="principal" 
                name="paymentMethod"
                value="principal"
                checked={paymentMethod === 'principal'}
                onChange={(e) => setPaymentMethod(e.target.value)}
              />
              <Label htmlFor="principal">等额本金</Label>
            </div>
          </div>
        </div>

        {loanType === 'mixed' ? (
          <>
            <div>
              <Label>商业贷款金额（万元）</Label>
              <Input
                type="number"
                value={loanAmount}
                onChange={(e) => setLoanAmount(e.target.value)}
                placeholder="请输入商业贷款金额"
                className="mt-1"
              />
            </div>
            <div>
              <Label>商业贷款年利率（%）</Label>
              <Input
                type="number"
                value={interestRate}
                onChange={(e) => setInterestRate(e.target.value)}
                placeholder="请输入商业贷款年利率"
                className="mt-1"
                step="0.01"
              />
            </div>
            <div>
              <Label>公积金贷款金额（万元）</Label>
              <Input
                type="number"
                value={fundAmount}
                onChange={(e) => setFundAmount(e.target.value)}
                placeholder="请输入公积金贷款金额"
                className="mt-1"
              />
            </div>
            <div>
              <Label>公积金贷款年利率（%）</Label>
              <Input
                type="number"
                value={fundRate}
                onChange={(e) => setFundRate(e.target.value)}
                placeholder="请输入公积金贷款年利率"
                className="mt-1"
                step="0.01"
              />
            </div>
          </>
        ) : (
          <>
            <div>
              <Label>贷款金额（万元）</Label>
              <Input
                type="number"
                value={loanAmount}
                onChange={(e) => setLoanAmount(e.target.value)}
                placeholder="请输入贷款金额"
                className="mt-1"
              />
            </div>
            <div>
              <Label>年利率（%）</Label>
              <Input
                type="number"
                value={interestRate}
                onChange={(e) => setInterestRate(e.target.value)}
                placeholder="请输入年利率"
                className="mt-1"
                step="0.01"
              />
            </div>
          </>
        )}

        <div>
          <Label>贷款年限（年）</Label>
          <Input
            type="number"
            value={loanYears}
            onChange={(e) => setLoanYears(e.target.value)}
            placeholder="请输入贷款年限"
            className="mt-1"
          />
        </div>

        {calculationType === 'existing' && (
          <div>
            <Label>已还款月数</Label>
            <Input
              type="number"
              value={paidMonths}
              onChange={(e) => setPaidMonths(e.target.value)}
              placeholder="请输入已还款月数"
              className="mt-1"
            />
          </div>
        )}
      </div>
    )
  }

  const renderResult = () => {
    if (loanType === 'mixed' && (!loanAmount || !fundAmount || !interestRate || !fundRate || !loanYears)) {
      return (
        <div className="text-center text-gray-500">
          请填写完整贷款信息
        </div>
      )
    } else if (loanType !== 'mixed' && (!loanAmount || !loanYears || !interestRate)) {
      return (
        <div className="text-center text-gray-500">
          请填写完整贷款信息
        </div>
      )
    } else if (calculationType === 'existing' && !paidMonths) {
      return (
        <div className="text-center text-gray-500">
          请填写已还款月数
        </div>
      )
    }

    const result = calculateMonthlyPayment()

    // 已有贷款计算结果
    if (calculationType === 'existing') {
      return (
        <div className="space-y-4">
          <div className="p-4 bg-orange-50 rounded-lg">
            <div className="text-lg font-semibold text-orange-600 mb-2">
              已还款情况
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="text-sm text-gray-500">已还本金</div>
                <div className="text-lg font-medium">{result.paidPrincipal} 元</div>
              </div>
              <div>
                <div className="text-sm text-gray-500">已还利息</div>
                <div className="text-lg font-medium">{result.paidInterest} 元</div>
              </div>
            </div>
          </div>

          <div className="p-4 bg-orange-50 rounded-lg">
            <div className="text-lg font-semibold text-orange-600 mb-2">
              剩余还款情况
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="text-sm text-gray-500">剩余本金</div>
                <div className="text-lg font-medium">{result.remainingPrincipal} 元</div>
              </div>
              <div>
                <div className="text-sm text-gray-500">剩余利息</div>
                <div className="text-lg font-medium">{result.remainingInterest} 元</div>
              </div>
              <div>
                <div className="text-sm text-gray-500">剩余期数</div>
                <div className="text-lg font-medium">{result.remainingMonths} 月 ({result.remainingYears} 年)</div>
              </div>
              {paymentMethod === 'principal' && (
                <div>
                  <div className="text-sm text-gray-500">当前月供</div>
                  <div className="text-lg font-medium">{result.currentMonthly} 元</div>
                </div>
              )}
            </div>
          </div>

          {/* 原始贷款信息 */}
          <div className="p-4 bg-gray-50 rounded-lg">
            <div className="text-lg font-semibold text-gray-600 mb-2">
              原始贷款信息
            </div>
            {loanType === 'mixed' ? (
              paymentMethod === 'equal' ? (
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-sm text-gray-500">月供</div>
                    <div className="text-base">{result.monthlyPayment} 元</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-500">总还款额</div>
                    <div className="text-base">{result.totalPayment} 元</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-500">总利息</div>
                    <div className="text-base">{result.totalInterest} 元</div>
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-sm text-gray-500">首月还款</div>
                    <div className="text-base">{result.firstMonthPayment} 元</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-500">月递减</div>
                    <div className="text-base">{result.monthlyPrincipal} 元</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-500">总还款额</div>
                    <div className="text-base">{result.totalPayment} 元</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-500">总利息</div>
                    <div className="text-base">{result.totalInterest} 元</div>
                  </div>
                </div>
              )
            ) : (
              paymentMethod === 'equal' ? (
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-sm text-gray-500">月供</div>
                    <div className="text-base">{result.monthlyPayment} 元</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-500">总还款额</div>
                    <div className="text-base">{result.totalPayment} 元</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-500">总利息</div>
                    <div className="text-base">{result.totalInterest} 元</div>
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-sm text-gray-500">首月还款</div>
                    <div className="text-base">{result.firstMonthPayment} 元</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-500">月递减</div>
                    <div className="text-base">{result.monthlyPrincipal} 元</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-500">总还款额</div>
                    <div className="text-base">{result.totalPayment} 元</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-500">总利息</div>
                    <div className="text-base">{result.totalInterest} 元</div>
                  </div>
                </div>
              )
            )}
          </div>
        </div>
      )
    }

    // 新贷款计算结果
    return (
      <div className="space-y-4">
        {loanType === 'mixed' ? (
          // 组合贷款结果展示
          paymentMethod === 'equal' ? (
            <>
              <div className="p-4 bg-orange-50 rounded-lg">
                <div className="text-lg font-semibold text-orange-600">
                  每月还款：{result.monthlyPayment} 元
                </div>
                <div className="text-sm text-gray-600 mt-1">
                  商业贷款月供：{result.commercialMonthly} 元
                </div>
                <div className="text-sm text-gray-600 mt-1">
                  公积金贷款月供：{result.fundMonthly} 元
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-gray-50 rounded-lg">
                  <div className="text-sm text-gray-500">总还款额</div>
                  <div className="text-lg font-medium">{result.totalPayment} 元</div>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <div className="text-sm text-gray-500">总利息</div>
                  <div className="text-lg font-medium">{result.totalInterest} 元</div>
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="p-4 bg-orange-50 rounded-lg">
                <div className="text-lg font-semibold text-orange-600">
                  首月还款：{result.firstMonthPayment} 元
                </div>
                <div className="text-sm text-gray-600 mt-1">
                  商业贷款首月：{result.commercialFirstMonth} 元
                </div>
                <div className="text-sm text-gray-600 mt-1">
                  公积金贷款首月：{result.fundFirstMonth} 元
                </div>
                <div className="text-sm text-gray-500 mt-1">
                  每月递减：{result.monthlyPrincipal} 元
                </div>
                <div className="text-sm text-gray-500 mt-1">
                  最后一月还款：{result.lastMonthPayment} 元
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-gray-50 rounded-lg">
                  <div className="text-sm text-gray-500">总还款额</div>
                  <div className="text-lg font-medium">{result.totalPayment} 元</div>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <div className="text-sm text-gray-500">总利息</div>
                  <div className="text-lg font-medium">{result.totalInterest} 元</div>
                </div>
              </div>
            </>
          )
        ) : (
          // 单一贷款结果展示
          paymentMethod === 'equal' ? (
            <>
              <div className="p-4 bg-orange-50 rounded-lg">
                <div className="text-lg font-semibold text-orange-600">
                  每月还款：{result.monthlyPayment} 元
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-gray-50 rounded-lg">
                  <div className="text-sm text-gray-500">总还款额</div>
                  <div className="text-lg font-medium">{result.totalPayment} 元</div>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <div className="text-sm text-gray-500">总利息</div>
                  <div className="text-lg font-medium">{result.totalInterest} 元</div>
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="p-4 bg-orange-50 rounded-lg">
                <div className="text-lg font-semibold text-orange-600">
                  首月还款：{result.firstMonthPayment} 元
                </div>
                <div className="text-sm text-gray-500 mt-1">
                  每月递减：{result.monthlyPrincipal} 元
                </div>
                <div className="text-sm text-gray-500 mt-1">
                  最后一月还款：{result.lastMonthPayment} 元
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-gray-50 rounded-lg">
                  <div className="text-sm text-gray-500">总还款额</div>
                  <div className="text-lg font-medium">{result.totalPayment} 元</div>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <div className="text-sm text-gray-500">总利息</div>
                  <div className="text-lg font-medium">{result.totalInterest} 元</div>
                </div>
              </div>
            </>
          )
        )}
      </div>
    )
  }

  return {
    renderInputOptions,
    renderResult
  }
}