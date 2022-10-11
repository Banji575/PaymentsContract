const { ethers } = require('hardhat')
const { expect } = require('chai')

describe('Payments', function () {
    let acc1
    let acc2
    let payments
    beforeEach(async function () {
        [acc1, acc2] = await ethers.getSigners()
        const Payments = await ethers.getContractFactory('Payments', acc1)
        payments = await Payments.deploy()
        await payments.deployed()
    })

    it("in should be deploy", async function () {
        expect(payments.address).to.be.properAddress;
    })

    it("should have 0 ehter by default", async function () {
        const balance = await payments.getBalance()
        expect(balance).to.eq(0)
    })

    it("sould be possible to send funds", async function () {
        const message = "Hello from hardhat"
        const tx = await payments.connect(acc2).pay(message, { value: 100 })
        expect(()=>tx)
        .to.changeEtherBalances([acc2, payments], [-100, 100])
        await tx.wait()

        const newPayment = await payments.getPayment(acc2.address,0)
       expect(newPayment.message).to.eq(message)
    })
})