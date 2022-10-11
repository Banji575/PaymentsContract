// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

contract Payments {
    struct Payment {
        uint256 amount;
        uint256 timestamp;
        address from;
        string message;
    }

    struct Balance {
        uint256 totalPayments;
        mapping(uint256 => Payment) payments;
    }

    mapping(address => Balance) public balanses;

    function getBalance() public view returns (uint256) {
        return address(this).balance;
    }

    function getPayment(address _addr, uint256 _index)
        public
        view
        returns (Payment memory)
    {
        return balanses[_addr].payments[_index];
    }

    function pay(string memory message) public payable {
        uint256 paymentNum = balanses[msg.sender].totalPayments;
        balanses[msg.sender].totalPayments++;

        Payment memory newPayment = Payment(
            msg.value,
            block.timestamp,
            msg.sender,
            message
        );

        balanses[msg.sender].payments[paymentNum] = newPayment;
    }
}
