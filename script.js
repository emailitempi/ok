jQuery(function ($) {
    'use strict'
    var supportsAudio = !!document.createElement('audio').canPlayType;
    if (supportsAudio) {
        // initialize plyr
        var player = new Plyr('#audio1', {
            controls: [
                'restart',
                'play',
                'progress',
                'current-time',
                'duration',
                'mute',
                'volume',
                'download'
            ]
        });
        // initialize playlist and controls
        var index = 0,
            playing = false,
            mediaPath = '',
            extension = '',
            tracks = [{
                "track": 1,
                "name": "Part 1",
                "duration": "",
                "file": "002"
            }, {
                "track": 2,
                "name": "Part 2",
                "duration": "",
                "file": "003"
            }, {
                "track": 3,
                "name": "Part 3",
                "duration": "",
                "file": "004"
            }, {
                "track": 4,
                "name": "Part 4",
                "duration": "",
                "file": "005"
            }, {
                "track": 5,
                "name": "Part 5",
                "duration": "",
                "file": "006"
            }, {
                "track": 6,
                "name": "Part 6",
                "duration": "",
                "file": "007"
            }, {
                "track": 7,
                "name": "Part 7",
                "duration": "",
                "file": "008"
            }, {
                "track": 8,
                "name": "Part 8",
                "duration": "",
                "file": "009"
            }, {
                "track": 9,
                "name": "Part 9",
                "duration": "",
                "file": "010"
            }, {
                "track": 10,
                "name": "Part 10",
                "duration": "",
                "file": "011"
            }, {
                "track": 11,
                "name": "Part 11",
                "duration": "",
                "file": "012"
            }, {
                "track": 12,
                "name": "Part 12",
                "duration": "",
                "file": "013"
            }, {
                "track": 13,
                "name": "Part 13",
                "duration": "",
                "file": "014"
            }, {
                "track": 14,
                "name": "Part 14",
                "duration": "",
                "file": "015"
            }, {
                "track": 15,
                "name": "Part 15",
                "duration": "",
                "file": "016"
            }, {
                "track": 16,
                "name": "Part 16",
                "duration": "",
                "file": "017"
            }, {
                "track": 17,
                "name": "Part 17",
                "duration": "",
                "file": "018"
            }, {
                "track": 18,
                "name": "Part 18",
                "duration": "",
                "file": "019"
            }, {
                "track": 19,
                "name": "Part 19",
                "duration": "",
                "file": "020"
            }, {
                "track": 20,
                "name": "Part 20",
                "duration": "",
                "file": "021"
            }, {
                "track": 21,
                "name": "Part 21",
                "duration": "",
                "file": "022"
            }, {
                "track": 22,
                "name": "Part 22",
                "duration": "",
                "file": "023"
            }, {
                "track": 23,
                "name": "Part 23",
                "duration": "",
                "file": "024"
            }, {
                "track": 24,
                "name": "Part 24",
                "duration": "",
                "file": "025"
            }, {
                "track": 25,
                "name": "Part 25",
                "duration": "",
                "file": "026"
            }, {
                "track": 26,
                "name": "Part 26",
                "duration": "",
                "file": "027"
            }, {
                "track": 27,
                "name": "Part 27",
                "duration": "",
                "file": "028"
            }, {
                "track": 28,
                "name": "Part 28",
                "duration": "",
                "file": "029"
            }, {
                "track": 29,
                "name": "Part 29",
                "duration": "",
                "file": "030"
            }, {
                "track": 30,
                "name": "Part 30",
                "duration": "",
                "file": "031"
            }, {
                "track": 31,
                "name": "Part 31",
                "duration": "",
                "file": "032"
            }, {
                "track": 32,
                "name": "Part 32",
                "duration": "",
                "file": "033"
            }, {
                "track": 33,
                "name": "Part 33",
                "duration": "",
                "file": "034"
            }, {
                "track": 34,
                "name": "Part 34",
                "duration": "",
                "file": "035"
            }, {
                "track": 35,
                "name": "Part 35",
                "duration": "",
                "file": "036"
            }, {
                "track": 36,
                "name": "Part 36",
                "duration": "",
                "file": "037"
            }, {
                "track": 37,
                "name": "Part 37",
                "duration": "",
                "file": "038"
            }, {
                "track": 38,
                "name": "Part 38",
                "duration": "",
                "file": "039"
            }, {
                "track": 39,
                "name": "Part 39",
                "duration": "",
                "file": "040"
            }, {
                "track": 40,
                "name": "Part 40",
                "duration": "",
                "file": "041"
            }, {
                "track": 41,
                "name": "Part 41",
                "duration": "",
                "file": "042"
            }],
            buildPlaylist = $.each(tracks, function(key, value) {
                var trackNumber = value.track,
                    trackName = value.name,
                    trackDuration = value.duration;
                if (trackNumber.toString().length === 1) {
                    trackNumber = '0' + trackNumber;
                }
                $('#plList').append('<li> \
                    <div class="plItem"> \
                        <span class="plNum">' + trackNumber + '.</span> \
                        <span class="plTitle">' + trackName + '</span> \
                        <span class="plLength">' + trackDuration + '</span> \
                    </div> \
                </li>');
            }),
            trackCount = tracks.length,
            npAction = $('#npAction'),
            npTitle = $('#npTitle'),
            audio = $('#audio1').on('play', function () {
                playing = true;
                npAction.text('Now Playing...');
            }).on('pause', function () {
                playing = false;
                npAction.text('Paused...');
            }).on('ended', function () {
                npAction.text('Paused...');
                if ((index + 1) < trackCount) {
                    index++;
                    loadTrack(index);
                    audio.play();
                } else {
                    audio.pause();
                    index = 0;
                    loadTrack(index);
                }
            }).get(0),
            btnPrev = $('#btnPrev').on('click', function () {
                if ((index - 1) > -1) {
                    index--;
                    loadTrack(index);
                    if (playing) {
                        audio.play();
                    }
                } else {
                    audio.pause();
                    index = 0;
                    loadTrack(index);
                }
            }),
            btnNext = $('#btnNext').on('click', function () {
                if ((index + 1) < trackCount) {
                    index++;
                    loadTrack(index);
                    if (playing) {
                        audio.play();
                    }
                } else {
                    audio.pause();
                    index = 0;
                    loadTrack(index);
                }
            }),
            li = $('#plList li').on('click', function () {
                var id = parseInt($(this).index());
                if (id !== index) {
                    playTrack(id);
                }
            }),
            loadTrack = function (id) {
                $('.plSel').removeClass('plSel');
                $('#plList li:eq(' + id + ')').addClass('plSel');
                npTitle.text(tracks[id].name);
                index = id;
                audio.src = mediaPath + tracks[id].file + extension;
                updateDownload(id, audio.src);
            },
            updateDownload = function (id, source) {
                player.on('loadedmetadata', function () {
                    $('a[data-plyr="download"]').attr('href', source);
                });
            },
            playTrack = function (id) {
                loadTrack(id);
                audio.play();
            };
        extension = audio.canPlayType('audio/mpeg') ? '.mp4' : audio.canPlayType('audio/ogg') ? '.ogg' : '';
        loadTrack(index);
    } else {
        // no audio support
        $('.column').addClass('hidden');
        var noSupport = $('#audio1').text();
        $('.container').append('<p class="no-support">' + noSupport + '</p>');
    }
});