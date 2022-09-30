// @ts-check
const datasource = require("../../datasource.js")
const sqlMapper = require("./mapper.js")
var mapper = sqlMapper.getMapper("songMapper")

async function executeQuery(transaction, query, rs)
{
  var conn = null;
  if(transaction===null)
  {
    conn = await datasource.getConnection()
    await conn.query(query)
    if(rs)
    {
      rs = await conn.query(query);
    }
    conn.release()

  }
  else
  {
    conn = await transaction.getConnection()
    if(rs)
    {
      rs = await conn.query(query);
    }
    await conn.query(query)
  }
}


var songRepository = {
  // create a user
  selectSong: async function (songId) {
    var songQuery = mapper.makeQuery("selectSong", {
      songId: songId,
    })
    const conn = await datasource.getConnection();
    const result = await conn.query(songQuery);
    const firstResult = await result[0];

    const artistId = firstResult.artistId;

    var artistQuery = mapper.makeQuery("selectArtist", {
        artistId: artistId
    })

    const artistResult = await conn.query(artistQuery);
    const artistName = artistResult[0].artistName;
    conn.release();

    return {songId: firstResult.songId, songName: firstResult.songName, artistId: artistName}
  },
  // select a single user

  addPlayRecord: async function (userId, songId, artistId, score, stars) {
    //const timeStamp = new Date().getTime();
    var query = mapper.makeQuery("insertPlayRecord", {
        userId: userId,
        songId: songId,
        artistId: artistId,
        score: score,
        stars: stars, 
    })
    const conn = await datasource.getConnection();
    const result = await conn.query(query);
    return result;
  },

  getHighScore: async function(userId) {
    var query = mapper.makeQuery(
      "selectHighScore", {
        userId: {userId}
      }
    )
    
  }
  
  


}

module.exports = { songRepository }
