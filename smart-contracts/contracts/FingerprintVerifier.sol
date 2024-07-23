// SPDX-License-Identifier: MIT
pragma solidity ^0.8.21;

contract FingerprintVerifier {
    mapping(bytes32 => bool) private fingerprints;

    function verifyFingerprint(bytes32 fingerprint) public view returns (bool) {
        return fingerprints[fingerprint];
    }

    function storeFingerprint(bytes32 fingerprint) public {
        require(!fingerprints[fingerprint], "Fingerprint already exists");
        fingerprints[fingerprint] = true;
    }
}
