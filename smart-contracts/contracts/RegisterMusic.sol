// SPDX-License-Identifier: MIT
pragma solidity ^0.8.21;

contract RegisterMusic {
    struct MusicTrack {
        string title;
        string artist;
        string ipfsHash;
        bytes32 fingerprint;
        address account;
    }

    mapping(bytes32 => MusicTrack) public tracks;
    mapping(address => bytes32[]) public userTracks;
    bytes32[] public allFingerprints;

    event TrackRegistered(address indexed user, bytes32 indexed fingerprint, string title, string artist, string ipfsHash);

    function registerTrack(string memory title, string memory artist, string memory ipfsHash, bytes32 fingerprint) public {
        require(tracks[fingerprint].fingerprint == 0, "Track already registered");

        MusicTrack memory newTrack = MusicTrack({
            title: title,
            artist: artist,
            ipfsHash: ipfsHash,
            fingerprint: fingerprint,
            account: msg.sender
        });

        tracks[fingerprint] = newTrack;
        userTracks[msg.sender].push(fingerprint);
        allFingerprints.push(fingerprint);

        emit TrackRegistered(msg.sender, fingerprint, title, artist, ipfsHash);
    }

    function getUserTracks(address user) public view returns (bytes32[] memory) {
        return userTracks[user];
    }

    function getTrack(bytes32 fingerprint) public view returns (string memory title, string memory artist, string memory ipfsHash, address account) {
        MusicTrack memory track = tracks[fingerprint];
        return (track.title, track.artist, track.ipfsHash, track.account);
    }

    function getAllTracks() public view returns (MusicTrack[] memory) {
        MusicTrack[] memory result = new MusicTrack[](allFingerprints.length);
        for (uint i = 0; i < allFingerprints.length; i++) {
            result[i] = tracks[allFingerprints[i]];
        }
        return result;
    }

    function searchTracks(string memory query) public view returns (MusicTrack[] memory) {
        MusicTrack[] memory result = new MusicTrack[](allFingerprints.length);
        uint count = 0;
        for (uint i = 0; i < allFingerprints.length; i++) {
            MusicTrack memory track = tracks[allFingerprints[i]];
            if (contains(track.title, query) || contains(track.artist, query)) {
                result[count] = track;
                count++;
            }
        }
        MusicTrack[] memory filteredResult = new MusicTrack[](count);
        for (uint j = 0; j < count; j++) {
            filteredResult[j] = result[j];
        }
        return filteredResult;
    }

    function contains(string memory where, string memory what) internal pure returns (bool) {
        bytes memory whereBytes = bytes(where);
        bytes memory whatBytes = bytes(what);

        if (whatBytes.length > whereBytes.length) {
            return false;
        }

        bool found = false;
        for (uint i = 0; i <= whereBytes.length - whatBytes.length; i++) {
            found = true;
            for (uint j = 0; j < whatBytes.length; j++) {
                if (whereBytes[i + j] != whatBytes[j]) {
                    found = false;
                    break;
                }
            }
            if (found) {
                return true;
            }
        }
        return false;
    }
}
