import { BigInt, Bytes } from '@graphprotocol/graph-ts'
import { NFT, Boardingpass } from '../../entities/schema'

export function buildBoardingpassFromNFT(nft: NFT): Boardingpass {
  let boardingpass = new Boardingpass(nft.id)
  boardingpass.tokenId = nft.tokenId
  boardingpass.owner = nft.owner

  return boardingpass
}

export function getTokenIdFromLabelHash(labelHash: Bytes): BigInt {
  // .reverse() changes the array! we need to change it back
  labelHash.reverse()
  let tokenId = BigInt.fromUnsignedBytes(labelHash)
  labelHash.reverse()

  return tokenId
}

export function getBoardingpassImage(boardingpass: Boardingpass): string {

  const boardingpassHash: string[] = ['',
    "QmcYTyq9L7etSAXPgn1qxMMnPcnCmnWYowiPaoYAwDoXWe",
    "QmWxy1XuP6rSGG82iCdcrzN1oy5aKnGQ7yaTrKuM9ogeMH",
    "QmSR5j7LtL1YN5S5xR5qKwKEr5Nwurf386tPqGTQ4CpfQ1",
    "QmVMg9N6FP4dGef1m4B9Bqzs5P7ZmvdT4mLzHBhqGygxGp",
    "QmdsQZqwuLhpAGJzXMkWa9QQFz2mSk3rZx27NPnG4WKLVj",
    "Qma1mARoxETPQ7SW5MoT8Nhtw9BBjGE8K3WTQQATVYtcid",
    "QmQApXRdBSArbaK6wjAYBfbp39MdodxgbNh5J2Nt5APc5G",
    "QmP9c2wKdAFum67YYyDEpgJXJX8NGFYNbLtmYfwbqQCM2P",
    "QmWsuw7hfsiA5i7cJNyAHnkj72FKdNfRTMm44g2qTSro5o",
    "QmUHXXJQfPXLeL7LMvtrbDoKL2nK3vsCy7muWUDciB6nu8",
    "QmdaqWFSbp6bn2U5cKeUMwEuWoN5Ha9tfUzmzygVttEb7p",
    "Qmef9ad2yU1ewCgXpMrhgexWUTxQWtiNfF8kRCSRMYmKBT",
    "QmfFUhumwPmBz8hBsoSdxQMTQbAVPapQPoiFV1NcxJZjov",
    "Qmcm1AAxrdk7nLLJimtDTWaxT5UGERmdbeay6QJCv7rFZy",
    "QmeDHJkePPXQkCpx85Mj371RM1AJYRc6xWRVp2aoPhye4x",
    "QmfVY4y6dSks5QpBQdJHxTmEohLv12YGDnXSaEoR2QGWg2",
    "QmTeybLrGKNGVzPVtefM2DaCaKVDPG2qAf4x7cs7n9sQVq",
    "QmbKEEDP3rfovZpkYJK92b1AoVWD78kX1x1Ai8LenWKus6",
    "QmVcKcmJcE9Dm2Dg9EWaXpAGtt69xe2LaLJPCFVvPtaQhN",
    "Qmb9Yv12os32Zjtx4HUFqsQX13BdbBnfnnnM8iJbBTMTVX",
    "QmP9f8qzUMFz7uhacnKXQyfVjzKCtUafFVARMWCm5z5UrY",
    "QmZ1y7fvDCoGZ5Aupf9SMwZgi19Hszgo1EkKxA3WPrydBw",
    "QmZbXA8VwYJhjFGJRT4aQa4Ad21N5SjiXsbWfJSQBM56Kk",
    "QmRVzY8j9jZro8sTmCohe9n5qTi6V1UzCf5k3Jb1msjk53",
    "QmbYasFfynU64Kpw7oGi3m6TG2SpLV4eijH6pSTmYF1krD",
    "Qma4qp9yKcJVFHpRpjamYr2JqMH63yW5WjU56NUzqX9kbF",
    "QmWXBgydnNKMKUk2QPmcj4gC5u7TZhyuNUog1Eui4b6WjJ",
    "QmYhjWKriiVPKg1EpA5ycy3UZhER1z4Zz72QzrPZMcctN9",
    "QmNf6donwJ8TDJNySEvQTfE5iYsvhRixk7yXYHqLfnEEnD",
    "QmYE6jiXUApqoqZENXPGSMXgs2zEoivKBzo8eokXUHWqiZ",
    "QmSyZNGuCwBKZTc7APHdhmrTizgJJ5j13kUPsAQFxTsDqh",
    "QmX86vpRYkr9amQwVgmWhVJXAPvgYYmiJWKe5Br6T7qj46",
    "Qmf8nhB3BWgvQ8HEXXEPgZxNYQ51oFfNLbKmejMbLMtiy8",
    "QmdnybgmemQxEuaRpcBQL2DtBx8jkkeprvTVgXo2AmhdZ3",
    "QmRt99hbV6JvXDRYcW6GzNcT3GE3HxWskGdtV1sUMdF1wq",
    "QmUxoVkFKDLHGiKCH1Gy6TqfBDXcv8GzD4bbrcVZUQrULZ",
    "QmaVZ8LkEqpDs52Mdin1ekGAhzQDqQAWPYvvsupv7a5Dbk",
    "QmPxi61cdVwxZpTbmkbsGpdbdY3w7F9qshP5brP2hzs9K2",
    "QmQ5uLguqjXgJKVettC7p8Ad9NnuLsTKXwGPhHTu4Xa3qG",
    "QmdHwhD3nvBAGBaRrnXqsRpHmEfShfAQ7usY97R8qarezV",
    "QmUyqdTPNDNe7676Rr6di4JssZmnwcC58WaEC1WvBkLuC2",
    "QmUSvvy2hHpDiMX64kvfJgHz3X2cns5PqvkQEq5BQpUokQ",
    "QmasBeK52P1ATcZd7GxP7iyLLWtRjd7Lv1tyDLaG7rmhXF",
    "QmcVtdia3b6UzEWaw6zpsLKSArjvx5Uzq657gW3QjwgYYL",
    "QmUnaUBGuzw3jfr4uBjQbFq3JuAboYtc2KBHahZRY6V3TQ",
    "QmPwWc6g9niXY8b2hknp4jbEeNWmGFuQwAXVAcGDhyJ3yn",
    "QmSzjq2ELY62bU7baP6jaiauc9Cyek4nF5QYyZzY8MsrTB",
    "QmSPnSDJbnAk76cjUqzmPqRXvBwvYYHhiM5L4Wy7bf3E2y",
    "QmUL51Y1R1xatsnsCQK61NXg4icuX7rXAXCNptPk3gAbg8",
    "QmWDvs4NUPKr8BTBUdo7sLpFrpaZUkKozyS9pjdXHhSMRV",
    "QmUpBzML4N4gZSXwrScwBRb6XNx9K17VzmNh9wBbiR5YvH",
    "QmeUfVkuiijXiSN5QadfFMX6mWTGg1zKHpzcX8u76C4ubD",
    "Qma4Q3HEgGBQbV7dm9QbYHAZYNPJiAGiTAvtPUEkacykC2",
    "QmSwQZTz64CcuLy5uXqijzN1GGUfJE3TTJ7eWzq1HmCT9M",
    "QmPUggdFcPkm7rWAEtojj2TTCUJmCSugrEwxtffEAf2wdC",
    "QmNeuuQrAuG21qSGW6jS8hcUEmaaEitQzJrncVg6N1C2Ta",
    "QmYiKGoKpFsGjmZUTYQ1gCaoPd1a2Q4RZuQFW4JWCD5G1W",
    "QmWpr1g6EMFWsfQvBKmTUtX7pp9b1FGtGP498gjHXAjGGM",
    "QmaNynUQZ6S4uQtB16nPWadGUYUePLe2n6P5pJjzbv6uZf",
    "QmaeapyMNgMo16pMUg4bN8Axm1oYEnLUAGQiRi7fU2pQJa",
    "QmXSN3s86eZCyzJ6mMCZJMUX9Yo9kVABCdphytQiyfNqGh",
    "QmYWwDbmm9f72xkvj4DFVzVsHQ4AcvN3koDEeFoFds7kyi",
    "QmPTG2mBQtMTNoU1xXNgU7Kzmrh9wrxpxpbocjrP4EgJwJ",
    "QmYCHK453T9YBkEDycgvVgemJN3aRLTNsBqjBgJfm4uFae",
    "QmZyMht2vFUzgpEZH8upLMfoSMGU37artEXHVf8yVpqBP2",
    "QmaXtWtppWGb1g9oscghoZeoZdorN2eCzvB6td8LguWUft",
    "QmU5hFWXH3MY5adWYW51tkJz9mRAnt9Td4LeHJbpiXAtLZ",
    "QmXCJ6c3FM31cFueaeLVn85QCpUEc3Gt4NjhZyJCtCJ1kZ",
    "QmTFfnNisWsHcmM3c9s7HVJSLmR2ZhVKTdFof6fbscuS5u",
    "QmRbP8Wr7WSgmv24DahtgJyPg3Q9MvGGTKGzJF4nVXcXzA",
    "QmX5v3AHPGiaQSYt8pM8KmVafpAwA2X2kzrPnupd6XrvL1",
    "QmaNpWQZQcV8LZA8mwBGAip5qfMACKCH3JkUR94bTGeXtT",
    "QmVx3KF6jdU78DqHoQwwZ6VcrkoJTYKyVX9gMjreSB2YHc",
    "QmSxQ2kg6n2g3VSQ4KeeSVRd7anhiobiePUNDHWsh26wGp",
    "QmZoBsvkw7VpfpGGipb5sPK9aHJAE4YvTBaeyyxpX1EpMb",
    "Qmc2CUEMo9SHFCrhXNFJzso3UEMD7B6Kb6rFyufkJp4fXz",
    "QmRj2bytFUPpWCnATqEGqdb2KfyEeGvmm3QesTfNNrNyPu",
    "Qmb2a58LotCtNnxZa7jw2Y6RgBGd2v2joSGQ2hxbuqQ37P",
    "QmRHC8Toqd6N5X3kSSb65GH5QTQppp3Gyr6PHvwMPLBghA",
    "QmZxcKo22GqB9LW9d4khNeAZ7ie73URSUdWvP9DT2xRpTK",
    "QmQ7E9h3LzRmbLmKt9QCxSAAVnuuc91F1udsq1SJwsRDBA",
    "QmXfBRWbCb67ioERg89rWjtq4dhe6vxUeRYzZRv1V9ux7d",
    "Qme84zK9AKqs7UVoDBuin8xq95mkWSUkznPtzBxcKjosJo",
    "QmbrNg5zWyum2NshcRTvQx4JrcYQEYKHJx74WY7YZkMMiS",
    "Qmc3vgp6ojukaUQ2QTADLDaA6CZY8x9nuDSPGDLkVVMbqf",
    "Qmc2xSBjRseDNPdqrs3TPogKrLfb7x3AsXjt6ZGMw78GcQ",
    "QmSAJVx5HGzE46XWxvGpWDTXvU7QfPwvuaTCmNziq5rK8g",
    "QmXZ2vL3JR8QggzTjorKG76SV4v1FrhN8FekyScTxcVEw2",
    "QmXrDzabe953XMQMB9hUA5iWJ5yo5DfcBVLPiBHhMPw6se",
    "QmX7hKdP5oMT34ryUwWWpJ8qeyb53X2HnAATDRnJYRgBGt",
    "QmWwsKVBt1pAcFrEJVsaSGZFtacxf61dqDTTP8SVFgww9F",
    "QmYMfiTYdcTkGEQ7tk5ssxGqQQfvhvtn3VuvJq7ytemGes",
    "QmUujPLyGcqUc9R52fdnt5uwbA6HkWcku3zwYdLitRB6mT",
    "QmSqidL4BHXgi3rhELiXVZCtH6H7nMTcdm1WL2sRb5EX9e",
    "QmfVgYEHdnjX9rvoQD168XuCuCsWwV9Sb2uVk44iqje83p",
    "QmcwQJn6WTGa9qhqBLyUz9NHNc35LbtbNHyzhJ9VCvkBWz",
    "QmVWfWujuhYtrZAkeaAphKsBu92oxgsEuz1JKSjAZi2Nar",
    "QmRTEc3M2yBva8MpCMtSoXMpFq53tMfxzeasrQM5xpGSwy",
    "QmUzqaxfHmaZ13orgh6FNGMUybeSgcTqNPRzFhcgyP4ZLc",
    "QmTxwo6HdSf7qQ1HCRCobZs419g1WhbHYiEjWMh1cz6pgu"]
  const idx: i32 = boardingpass.tokenId.toI32()
  if (idx <= 100 && idx >= 0) {
    return "https://gateway.pinata.cloud/ipfs/" + boardingpassHash[idx].toString()
  }
  return ""

}
