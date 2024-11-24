(function(g){var window=this;'use strict';var bmb=function(a,b){a.gb("onAutonavCoundownStarted",b)},B5=function(a,b,c){g.Bp(a.element,"ytp-suggestion-set",!!b.videoId);
var d=b.playlistId;c=b.wh(c?c:"mqdefault.jpg");var e=null,f=null;b instanceof g.CQ&&(b.lengthText?(e=b.lengthText||null,f=b.qy||null):b.lengthSeconds&&(e=g.Xy(b.lengthSeconds),f=g.Xy(b.lengthSeconds,!0)));var h=!!d;d=h&&g.AQ(d).type==="RD";var l=b instanceof g.CQ?b.isLivePlayback:null,m=b instanceof g.CQ?b.isUpcoming:null,n=b.author,p=b.shortViewCount,q=b.publishedTimeText,r=[],t=[];n&&r.push(n);p&&(r.push(p),t.push(p));q&&t.push(q);c={title:b.title,author:n,author_and_views:r.join(" \u2022 "),aria_label:b.ariaLabel||
g.NE("Watch $TITLE",{TITLE:b.title}),duration:e,timestamp:f,url:b.Wl(),is_live:l,is_upcoming:m,is_list:h,is_mix:d,background:c?"background-image: url("+c+")":"",views_and_publish_time:t.join(" \u2022 "),autoplayAlternativeHeader:b.Ot};b instanceof g.BQ&&(c.playlist_length=b.playlistLength);a.update(c)},C5=function(a){var b=a.V(),c=b.D;
g.S.call(this,{J:"a",S:"ytp-autonav-suggestion-card",Y:{href:"{{url}}",target:c?b.Z:"","aria-label":"{{aria_label}}","data-is-live":"{{is_live}}","data-is-list":"{{is_list}}","data-is-mix":"{{is_mix}}","data-is-upcoming":"{{is_upcoming}}"},X:[{J:"div",Ka:["ytp-autonav-endscreen-upnext-thumbnail","ytp-autonav-thumbnail-small"],Y:{style:"{{background}}"},X:[{J:"div",Y:{"aria-label":"{{timestamp}}"},Ka:["ytp-autonav-timestamp"],ya:"{{duration}}"},{J:"div",Ka:["ytp-autonav-live-stamp"],ya:"Live"},{J:"div",
Ka:["ytp-autonav-upcoming-stamp"],ya:"Upcoming"},{J:"div",S:"ytp-autonav-list-overlay",X:[{J:"div",S:"ytp-autonav-mix-text",ya:"Mix"},{J:"div",S:"ytp-autonav-mix-icon"}]}]},{J:"div",Ka:["ytp-autonav-endscreen-upnext-title","ytp-autonav-title-card"],ya:"{{title}}"},{J:"div",Ka:["ytp-autonav-endscreen-upnext-author","ytp-autonav-author-card"],ya:"{{author}}"},{J:"div",Ka:["ytp-autonav-endscreen-upnext-author","ytp-autonav-view-and-date-card"],ya:"{{views_and_publish_time}}"}]});this.K=a;this.suggestion=
null;this.j=c;this.listen("click",this.onClick);this.listen("keypress",this.onKeyPress)},D5=function(a,b){b=b===void 0?!1:b;
g.S.call(this,{J:"div",S:"ytp-autonav-endscreen-countdown-overlay"});var c=this;this.L=b;this.cancelCommand=this.G=void 0;this.C=0;this.container=new g.S({J:"div",S:"ytp-autonav-endscreen-countdown-container"});g.P(this,this.container);this.container.Ha(this.element);b=a.V();var d=b.D;this.K=a;this.suggestion=null;this.onVideoDataChange("newdata",this.K.getVideoData());this.T(a,"videodatachange",this.onVideoDataChange);this.j=new g.S({J:"div",S:"ytp-autonav-endscreen-upnext-container",Y:{"aria-label":"{{aria_label}}",
"data-is-live":"{{is_live}}","data-is-list":"{{is_list}}","data-is-mix":"{{is_mix}}","data-is-upcoming":"{{is_upcoming}}"},X:[{J:"div",S:"ytp-autonav-endscreen-upnext-header"},{J:"div",S:"ytp-autonav-endscreen-upnext-alternative-header",ya:"{{autoplayAlternativeHeader}}"},{J:"a",S:"ytp-autonav-endscreen-link-container",Y:{href:"{{url}}",target:d?b.Z:""},X:[{J:"div",S:"ytp-autonav-endscreen-upnext-thumbnail",Y:{style:"{{background}}"},X:[{J:"div",Y:{"aria-label":"{{timestamp}}"},Ka:["ytp-autonav-timestamp"],
ya:"{{duration}}"},{J:"div",Ka:["ytp-autonav-live-stamp"],ya:"Live"},{J:"div",Ka:["ytp-autonav-upcoming-stamp"],ya:"Upcoming"}]},{J:"div",S:"ytp-autonav-endscreen-video-info",X:[{J:"div",S:"ytp-autonav-endscreen-premium-badge"},{J:"div",S:"ytp-autonav-endscreen-upnext-title",ya:"{{title}}"},{J:"div",S:"ytp-autonav-endscreen-upnext-author",ya:"{{author}}"},{J:"div",S:"ytp-autonav-view-and-date",ya:"{{views_and_publish_time}}"},{J:"div",S:"ytp-autonav-author-and-view",ya:"{{author_and_views}}"}]}]}]});
g.P(this,this.j);this.j.Ha(this.container.element);d||this.T(this.j.Da("ytp-autonav-endscreen-link-container"),"click",this.FV);this.K.createClientVe(this.container.element,this,115127);this.K.createClientVe(this.j.Da("ytp-autonav-endscreen-link-container"),this,115128);this.overlay=new g.S({J:"div",S:"ytp-autonav-overlay"});g.P(this,this.overlay);this.overlay.Ha(this.container.element);this.B=new g.S({J:"div",S:"ytp-autonav-endscreen-button-container"});g.P(this,this.B);this.B.Ha(this.container.element);
this.cancelButton=new g.S({J:"button",Ka:["ytp-autonav-endscreen-upnext-button","ytp-autonav-endscreen-upnext-cancel-button",b.N("web_modern_buttons")?"ytp-autonav-endscreen-upnext-button-rounded":""],Y:{"aria-label":"Cancel autoplay"},ya:"Cancel"});g.P(this,this.cancelButton);this.cancelButton.Ha(this.B.element);this.cancelButton.listen("click",this.p5,this);this.K.createClientVe(this.cancelButton.element,this,115129);this.playButton=new g.S({J:"a",Ka:["ytp-autonav-endscreen-upnext-button","ytp-autonav-endscreen-upnext-play-button",
b.N("web_modern_buttons")?"ytp-autonav-endscreen-upnext-button-rounded":""],Y:{href:"{{url}}",role:"button","aria-label":"Play next video"},ya:"Play Now"});g.P(this,this.playButton);this.playButton.Ha(this.B.element);this.playButton.listen("click",this.FV,this);this.K.N("web_player_autonav_next_button_renderer")?(this.K.createServerVe(this.playButton.element,this.playButton,!0),(b=this.K.getVideoData())&&cmb(this,b)):this.K.createClientVe(this.playButton.element,this,115130);this.D=new g.pp(function(){dmb(c)},
500);
g.P(this,this.D);this.EV();this.T(a,"autonavvisibility",this.EV);this.K.N("web_autonav_color_transition")&&(this.T(a,"autonavchange",this.o5),this.T(a,"onAutonavCoundownStarted",this.jba))},E5=function(a){var b=a.K.hn(!0,a.K.isFullscreen());
g.Bp(a.container.element,"ytp-autonav-endscreen-small-mode",a.fh(b));g.Bp(a.container.element,"ytp-autonav-endscreen-is-premium",!!a.suggestion&&!!a.suggestion.rN);g.Bp(a.K.getRootNode(),"ytp-autonav-endscreen-cancelled-state",!a.K.Mf());g.Bp(a.K.getRootNode(),"countdown-running",a.gm());g.Bp(a.container.element,"ytp-player-content",a.K.Mf());g.Am(a.overlay.element,{width:b.width+"px"});if(!a.gm()){a.K.Mf()?emb(a,Math.round(fmb(a)/1E3)):emb(a);b=!!a.suggestion&&!!a.suggestion.Ot;var c=a.K.Mf()||!b;
g.Bp(a.container.element,"ytp-autonav-endscreen-upnext-alternative-header-only",!c&&b);g.Bp(a.container.element,"ytp-autonav-endscreen-upnext-no-alternative-header",c&&!b);g.Lx(a.B,a.K.Mf());g.Bp(a.element,"ytp-enable-w2w-color-transitions",gmb(a))}},dmb=function(a){var b=fmb(a),c=Math,d=c.min;
var e=a.C?Date.now()-a.C:0;c=d.call(c,e,b);emb(a,Math.ceil((b-c)/1E3));b-c<=500&&a.gm()?a.select(!0):a.gm()&&a.D.start()},fmb=function(a){if(a.K.isFullscreen()){var b;
a=(b=a.K.getVideoData())==null?void 0:b.dE;return a===-1||a===void 0?8E3:a}return a.K.ju()>=0?a.K.ju():g.JD(a.K.V().experiments,"autoplay_time")||1E4},cmb=function(a,b){a.K.N("web_player_autonav_next_button_renderer");
b=b.Z4;a.G=b==null?void 0:b.navigationEndpoint;b=b==null?void 0:b.trackingParams;a.playButton&&b&&a.K.setTrackingParams(a.playButton.element,b)},gmb=function(a){var b;
return!((b=a.K.getVideoData())==null||!b.watchToWatchTransitionRenderer)},emb=function(a,b){b=b===void 0?-1:b;
a=a.j.Da("ytp-autonav-endscreen-upnext-header");g.oh(a);if(b>=0){b=String(b);var c="Up next in $SECONDS".match(RegExp("\\$SECONDS","gi"))[0],d="Up next in $SECONDS".indexOf(c);if(d>=0){a.appendChild(g.mh("Up next in $SECONDS".slice(0,d)));var e=g.lh("span");g.vp(e,"ytp-autonav-endscreen-upnext-header-countdown-number");g.sh(e,b);a.appendChild(e);a.appendChild(g.mh("Up next in $SECONDS".slice(d+c.length)));return}}g.sh(a,"Up next")},F5=function(a,b){g.S.call(this,{J:"div",
Ka:["html5-endscreen","ytp-player-content",b||"base-endscreen"]});this.created=!1;this.player=a},G5=function(a){g.S.call(this,{J:"div",
Ka:["ytp-upnext","ytp-player-content"],Y:{"aria-label":"{{aria_label}}"},X:[{J:"div",S:"ytp-cued-thumbnail-overlay-image",Y:{style:"{{background}}"}},{J:"span",S:"ytp-upnext-top",X:[{J:"span",S:"ytp-upnext-header",ya:"Up Next"},{J:"span",S:"ytp-upnext-title",ya:"{{title}}"},{J:"span",S:"ytp-upnext-author",ya:"{{author}}"}]},{J:"a",S:"ytp-upnext-autoplay-icon",Y:{role:"button",href:"{{url}}","aria-label":"Play next video"},X:[{J:"svg",Y:{height:"100%",version:"1.1",viewBox:"0 0 72 72",width:"100%"},
X:[{J:"circle",S:"ytp-svg-autoplay-circle",Y:{cx:"36",cy:"36",fill:"#fff","fill-opacity":"0.3",r:"31.5"}},{J:"circle",S:"ytp-svg-autoplay-ring",Y:{cx:"-36",cy:"36","fill-opacity":"0",r:"33.5",stroke:"#FFFFFF","stroke-dasharray":"211","stroke-dashoffset":"-211","stroke-width":"4",transform:"rotate(-90)"}},{J:"path",S:"ytp-svg-fill",Y:{d:"M 24,48 41,36 24,24 V 48 z M 44,24 v 24 h 4 V 24 h -4 z"}}]}]},{J:"span",S:"ytp-upnext-bottom",X:[{J:"span",S:"ytp-upnext-cancel"},{J:"span",S:"ytp-upnext-paused",
ya:"Autoplay is paused"}]}]});this.api=a;this.cancelButton=null;this.G=this.Da("ytp-svg-autoplay-ring");this.C=this.notification=this.j=this.suggestion=null;this.D=new g.pp(this.JJ,5E3,this);this.B=0;var b=this.Da("ytp-upnext-cancel");this.cancelButton=new g.S({J:"button",Ka:["ytp-upnext-cancel-button","ytp-button"],Y:{tabindex:"0","aria-label":"Cancel autoplay"},ya:"Cancel"});g.P(this,this.cancelButton);this.cancelButton.listen("click",this.q5,this);this.cancelButton.Ha(b);this.cancelButton&&this.api.createClientVe(this.cancelButton.element,
this,115129);g.P(this,this.D);this.api.createClientVe(this.element,this,18788);b=this.Da("ytp-upnext-autoplay-icon");this.T(b,"click",this.r5);this.api.createClientVe(b,this,115130);this.GV();this.T(a,"autonavvisibility",this.GV);this.T(a,"mdxnowautoplaying",this.Wba);this.T(a,"mdxautoplaycanceled",this.Xba);g.Bp(this.element,"ytp-upnext-mobile",this.api.V().B)},hmb=function(a,b){if(b)return b;
if(a.api.isFullscreen()){var c;a=(c=a.api.getVideoData())==null?void 0:c.dE;return a===-1||a===void 0?8E3:a}return a.api.ju()>=0?a.api.ju():g.JD(a.api.V().experiments,"autoplay_time")||1E4},imb=function(a,b){b=hmb(a,b);
var c=Math,d=c.min;var e=(0,g.Ut)()-a.B;c=d.call(c,e,b);b=b===0?1:Math.min(c/b,1);a.G.setAttribute("stroke-dashoffset",""+-211*(b+1));b>=1&&a.gm()&&a.api.getPresentingPlayerType()!==3?a.select(!0):a.gm()&&a.j.start()},H5=function(a){F5.call(this,a,"autonav-endscreen");
this.overlay=this.videoData=null;this.table=new g.S({J:"div",S:"ytp-suggestion-panel",X:[{J:"div",Ka:["ytp-autonav-endscreen-upnext-header","ytp-autonav-endscreen-more-videos"],ya:"More videos"}]});this.W=new g.S({J:"div",S:"ytp-suggestions-container"});this.videos=[];this.C=null;this.G=this.L=!1;this.B=new D5(this.player);g.P(this,this.B);this.B.Ha(this.element);a.getVideoData().Yf?this.j=this.B:(this.j=new G5(a),g.pS(this.player,this.j.element,4),g.P(this,this.j));this.overlay=new g.S({J:"div",
S:"ytp-autonav-overlay-cancelled-state"});g.P(this,this.overlay);this.overlay.Ha(this.element);this.D=new g.cG(this);g.P(this,this.D);g.P(this,this.table);this.table.Ha(this.element);this.table.show();g.P(this,this.W);this.W.Ha(this.table.element);this.hide()},I5=function(a){var b=a.Mf();
b!==a.G&&(a.G=b,a.player.publish("autonavvisibility"),a.G?(a.B!==a.j&&a.B.hide(),a.table.hide()):(a.B!==a.j&&a.B.show(),a.table.show()))},J5=function(a,b){g.S.call(this,{J:"button",
Ka:["ytp-watch-on-youtube-button","ytp-button"],ya:"{{content}}"});this.K=a;this.buttonType=this.buttonType=b;this.N2();this.buttonType===2&&g.xp(this.element,"ytp-continue-watching-button");this.listen("click",this.onClick);this.listen("videodatachange",this.N2);g.Lx(this,!0)},K5=function(a,b){F5.call(this,a,"embeds-lite-endscreen");
this.K=a;this.Ue=b;this.K.createClientVe(this.element,this,156943);this.watchButton=new J5(a,2);g.P(this,this.watchButton);this.watchButton.Ha(this.element);this.hide()},jmb=function(a){F5.call(this,a,"subscribecard-endscreen");
this.j=new g.S({J:"div",S:"ytp-subscribe-card",X:[{J:"img",S:"ytp-author-image",Y:{src:"{{profilePicture}}"}},{J:"div",S:"ytp-subscribe-card-right",X:[{J:"div",S:"ytp-author-name",ya:"{{author}}"},{J:"div",S:"html5-subscribe-button-container"}]}]});g.P(this,this.j);this.j.Ha(this.element);var b=a.getVideoData();this.subscribeButton=new g.KY("Subscribe",null,"Unsubscribe",null,!0,!1,b.Bm,b.subscribed,"trailer-endscreen",null,a,!1);g.P(this,this.subscribeButton);this.subscribeButton.Ha(this.j.Da("html5-subscribe-button-container"));
this.T(a,"videodatachange",this.Ta);this.Ta();this.hide()},L5=function(a){var b=a.V(),c=g.ZF||g.EP?{style:"will-change: opacity"}:void 0,d=b.D,e=["ytp-videowall-still"];
b.B&&e.push("ytp-videowall-show-text");g.S.call(this,{J:"a",Ka:e,Y:{href:"{{url}}",target:d?b.Z:"","aria-label":"{{aria_label}}","data-is-live":"{{is_live}}","data-is-list":"{{is_list}}","data-is-mix":"{{is_mix}}"},X:[{J:"div",S:"ytp-videowall-still-image",Y:{style:"{{background}}"}},{J:"span",S:"ytp-videowall-still-info",Y:{"aria-hidden":"true"},X:[{J:"span",S:"ytp-videowall-still-info-bg",X:[{J:"span",S:"ytp-videowall-still-info-content",Y:c,X:[{J:"span",S:"ytp-videowall-still-info-title",ya:"{{title}}"},
{J:"span",S:"ytp-videowall-still-info-author",ya:"{{author_and_views}}"},{J:"span",S:"ytp-videowall-still-info-live",ya:"Live"},{J:"span",S:"ytp-videowall-still-info-duration",ya:"{{duration}}"}]}]}]},{J:"span",Ka:["ytp-videowall-still-listlabel-regular","ytp-videowall-still-listlabel"],Y:{"aria-hidden":"true"},X:[{J:"span",S:"ytp-videowall-still-listlabel-icon"},"Playlist",{J:"span",S:"ytp-videowall-still-listlabel-length",X:[" (",{J:"span",ya:"{{playlist_length}}"},")"]}]},{J:"span",Ka:["ytp-videowall-still-listlabel-mix",
"ytp-videowall-still-listlabel"],Y:{"aria-hidden":"true"},X:[{J:"span",S:"ytp-videowall-still-listlabel-mix-icon"},"Mix",{J:"span",S:"ytp-videowall-still-listlabel-length",ya:" (50+)"}]}]});this.suggestion=null;this.B=d;this.api=a;this.j=new g.cG(this);g.P(this,this.j);this.listen("click",this.onClick);this.listen("keypress",this.onKeyPress);this.j.T(a,"videodatachange",this.onVideoDataChange);a.createServerVe(this.element,this);this.onVideoDataChange()},M5=function(a){F5.call(this,a,"videowall-endscreen");
var b=this;this.K=a;this.C=0;this.stills=[];this.D=this.videoData=null;this.G=this.W=!1;this.Z=null;this.B=new g.cG(this);g.P(this,this.B);this.L=new g.pp(function(){g.xp(b.element,"ytp-show-tiles")},0);
g.P(this,this.L);var c=new g.S({J:"button",Ka:["ytp-button","ytp-endscreen-previous"],Y:{"aria-label":"Previous"},X:[g.Sx()]});g.P(this,c);c.Ha(this.element);c.listen("click",this.v5,this);this.table=new g.Ix({J:"div",S:"ytp-endscreen-content"});g.P(this,this.table);this.table.Ha(this.element);c=new g.S({J:"button",Ka:["ytp-button","ytp-endscreen-next"],Y:{"aria-label":"Next"},X:[g.Tx()]});g.P(this,c);c.Ha(this.element);c.listen("click",this.u5,this);a.getVideoData().Yf?this.j=new D5(a,!0):this.j=
new G5(a);g.P(this,this.j);g.pS(this.player,this.j.element,4);a.createClientVe(this.element,this,158789);this.hide()},N5=function(a){return g.qS(a.player)&&a.HE()&&!a.D},O5=function(a){var b=a.Mf();
b!==a.W&&(a.W=b,a.player.publish("autonavvisibility"))},P5=function(a){F5.call(this,a,"watch-again-on-youtube-endscreen");
this.watchButton=new J5(a,1);g.P(this,this.watchButton);this.watchButton.Ha(this.element);g.Mab(a)&&(this.j=new g.u1(a),g.P(this,this.j),this.B=new g.S({J:"div",Ka:["ytp-watch-again-on-youtube-endscreen-more-videos-container"],Y:{tabIndex:"-1"},X:[this.j]}),g.P(this,this.B),this.j.Ha(this.B.element),this.B.Ha(this.element));a.createClientVe(this.element,this,156914);this.hide()},nmb=function(a){g.fY.call(this,a);
var b=this;this.endScreen=null;this.B=this.j=this.C=this.D=!1;this.listeners=new g.cG(this);g.P(this,this.listeners);var c=a.V(),d=a.getVideoData();d=d&&d.limitedPlaybackDurationInSeconds!==0;g.Bs(g.PP(c))&&d&&!g.mS(a)?(this.B=!0,this.endScreen=new K5(a,g.aS(a))):a.jd()?this.endScreen=new P5(a):kmb(a)?(this.D=!0,lmb(this),this.j?this.endScreen=new H5(a):this.endScreen=new M5(a)):c.nh?this.endScreen=new jmb(a):this.endScreen=new F5(a);g.P(this,this.endScreen);g.pS(a,this.endScreen.element,4);mmb(this);
this.listeners.T(a,"videodatachange",this.onVideoDataChange,this);this.listeners.T(a,g.CE("endscreen"),function(e){b.onCueRangeEnter(e)});
this.listeners.T(a,g.DE("endscreen"),function(e){b.onCueRangeExit(e)})},lmb=function(a){var b=a.player.getVideoData();
if(!b||a.j===b.Cm&&a.C===b.Yf)return!1;a.j=b.Cm;a.C=b.Yf;return!0},kmb=function(a){a=a.V();
return a.Ed&&!a.nh},mmb=function(a){a.player.bf("endscreen");
var b=a.player.getVideoData();b=new g.AE(Math.max((b.lengthSeconds-10)*1E3,0),0x8000000000000,{id:"preload",namespace:"endscreen"});var c=new g.AE(0x8000000000000,0x8000000000000,{id:"load",priority:8,namespace:"endscreen"});a.player.gf([b,c])};
g.iS.prototype.ju=g.ca(14,function(){return this.app.ju()});
g.S_.prototype.ju=g.ca(13,function(){return this.getVideoData().dN});
g.eS.prototype.Ys=g.ca(12,function(a){this.Qi().Ys(a)});
g.$Y.prototype.Ys=g.ca(11,function(a){this.j!==a&&(this.j=a,this.Ta())});
g.h_.prototype.Ys=g.ca(10,function(a){this.overflowButton&&this.overflowButton.Ys(a)});
g.eS.prototype.Zs=g.ca(9,function(a){this.Qi().Zs(a)});
g.eZ.prototype.Zs=g.ca(8,function(a){this.j!==a&&(this.j=a,this.Ta())});
g.h_.prototype.Zs=g.ca(7,function(a){this.shareButton&&this.shareButton.Zs(a)});
g.eS.prototype.IC=g.ca(6,function(a){this.Qi().IC(a)});
g.DY.prototype.IC=g.ca(5,function(a){this.lT!==a&&(this.lT=a,this.wr())});
g.eS.prototype.HC=g.ca(4,function(a){this.Qi().HC(a)});
g.h_.prototype.HC=g.ca(3,function(a){this.kT!==a&&(this.kT=a,this.vr())});g.w(C5,g.S);C5.prototype.select=function(){this.K.Hp(this.suggestion.videoId,this.suggestion.sessionData,this.suggestion.playlistId,void 0,void 0,this.suggestion.qF||void 0)&&this.K.logClick(this.element)};
C5.prototype.onClick=function(a){g.cT(a,this.K,this.j,this.suggestion.sessionData||void 0)&&this.select()};
C5.prototype.onKeyPress=function(a){switch(a.keyCode){case 13:case 32:a.defaultPrevented||(this.select(),a.preventDefault())}};g.w(D5,g.S);g.k=D5.prototype;g.k.UI=function(a){this.suggestion!==a&&(this.suggestion=a,B5(this.j,a),this.playButton.updateValue("url",this.suggestion.Wl()),E5(this))};
g.k.gm=function(){return this.C>0};
g.k.QC=function(){this.gm()||(this.C=Date.now(),dmb(this),bmb(this.K,fmb(this)),g.Bp(this.K.getRootNode(),"countdown-running",this.gm()))};
g.k.Uy=function(){this.gr();dmb(this);var a=this.j.Da("ytp-autonav-endscreen-upnext-header");a&&g.sh(a,"Up next")};
g.k.gr=function(){this.gm()&&(this.D.stop(),this.C=0)};
g.k.select=function(a){this.K.nextVideo(!1,a===void 0?!1:a);this.gr()};
g.k.FV=function(a){g.cT(a,this.K)&&(a.currentTarget===this.playButton.element?this.K.logClick(this.playButton.element):a.currentTarget===this.j.Da("ytp-autonav-endscreen-link-container")&&(a=this.j.Da("ytp-autonav-endscreen-link-container"),this.K.logVisibility(a,!0),this.K.logClick(a)),this.K.N("web_player_autonav_next_button_renderer")&&this.G?(this.K.gb("innertubeCommand",this.G),this.gr()):this.select())};
g.k.p5=function(){this.K.logClick(this.cancelButton.element);g.kS(this.K,!0);this.cancelCommand&&this.K.gb("innertubeCommand",this.cancelCommand)};
g.k.onVideoDataChange=function(a,b){this.K.N("web_player_autonav_next_button_renderer")&&cmb(this,b);var c;this.cancelCommand=(c=b.Y4)==null?void 0:c.command};
g.k.jba=function(a){if(gmb(this)){var b=this.K.getVideoData().watchToWatchTransitionRenderer,c=b==null?void 0:b.fromColorPaletteDark;b=b==null?void 0:b.toColorPaletteDark;if(c&&b){var d=this.element;d.style.setProperty("--w2w-start-background-color",g.lz(c.surgeColor));d.style.setProperty("--w2w-start-primary-text-color",g.lz(c.primaryTitleColor));d.style.setProperty("--w2w-start-secondary-text-color",g.lz(c.secondaryTitleColor));d.style.setProperty("--w2w-end-background-color",g.lz(b.surgeColor));
d.style.setProperty("--w2w-end-primary-text-color",g.lz(b.primaryTitleColor));d.style.setProperty("--w2w-end-secondary-text-color",g.lz(b.secondaryTitleColor));d.style.setProperty("--w2w-animation-duration",a+"ms")}g.Bp(this.element,"ytp-w2w-animate",!0)}};
g.k.o5=function(a){this.K.N("web_autonav_color_transition")&&a!==2&&g.Bp(this.element,"ytp-w2w-animate",!1)};
g.k.EV=function(){var a=this.K.Mf();this.L&&this.Eb!==a&&g.Lx(this,a);E5(this);this.K.logVisibility(this.container.element,a);this.K.logVisibility(this.cancelButton.element,a);this.K.logVisibility(this.j.Da("ytp-autonav-endscreen-link-container"),a);this.K.logVisibility(this.playButton.element,a)};
g.k.fh=function(a){return a.width<400||a.height<459};g.w(F5,g.S);g.k=F5.prototype;g.k.create=function(){this.created=!0};
g.k.destroy=function(){this.created=!1};
g.k.HE=function(){return!1};
g.k.Mf=function(){return!1};
g.k.x_=function(){return!1};g.w(G5,g.S);g.k=G5.prototype;g.k.JJ=function(){this.notification&&(this.D.stop(),this.Nc(this.C),this.C=null,this.notification.close(),this.notification=null)};
g.k.UI=function(a){this.suggestion=a;B5(this,a,"hqdefault.jpg")};
g.k.GV=function(){g.Lx(this,this.api.Mf());this.api.logVisibility(this.element,this.api.Mf());this.api.logVisibility(this.Da("ytp-upnext-autoplay-icon"),this.api.Mf());this.cancelButton&&this.api.logVisibility(this.cancelButton.element,this.api.Mf())};
g.k.fca=function(){window.focus();this.JJ()};
g.k.QC=function(a){var b=this;this.gm()||(g.Gv("a11y-announce","Up Next "+this.suggestion.title),this.B=(0,g.Ut)(),this.j=new g.pp(function(){imb(b,a)},25),imb(this,a),bmb(this.api,hmb(this,a)));
g.zp(this.element,"ytp-upnext-autoplay-paused")};
g.k.hide=function(){g.S.prototype.hide.call(this)};
g.k.gm=function(){return!!this.j};
g.k.Uy=function(){this.gr();this.B=(0,g.Ut)();imb(this);g.xp(this.element,"ytp-upnext-autoplay-paused")};
g.k.gr=function(){this.gm()&&(this.j.dispose(),this.j=null)};
g.k.select=function(a){a=a===void 0?!1:a;if(this.api.V().N("autonav_notifications")&&a&&window.Notification&&typeof document.hasFocus==="function"){var b=Notification.permission;b==="default"?Notification.requestPermission():b!=="granted"||document.hasFocus()||(this.JJ(),this.notification=new Notification("Up Next",{body:this.suggestion.title,icon:this.suggestion.wh()}),this.C=this.T(this.notification,"click",this.fca),this.D.start())}this.gr();this.api.nextVideo(!1,a)};
g.k.r5=function(a){!g.rh(this.cancelButton.element,a.target)&&g.cT(a,this.api)&&(this.api.Mf()&&this.api.logClick(this.Da("ytp-upnext-autoplay-icon")),this.select())};
g.k.q5=function(){this.api.Mf()&&this.cancelButton&&this.api.logClick(this.cancelButton.element);g.kS(this.api,!0)};
g.k.Wba=function(a){this.api.getPresentingPlayerType();this.show();this.QC(a)};
g.k.Xba=function(){this.api.getPresentingPlayerType();this.gr();this.hide()};
g.k.xa=function(){this.gr();this.JJ();g.S.prototype.xa.call(this)};g.w(H5,F5);g.k=H5.prototype;g.k.create=function(){F5.prototype.create.call(this);this.D.T(this.player,"appresize",this.zD);this.D.T(this.player,"onVideoAreaChange",this.zD);this.D.T(this.player,"videodatachange",this.onVideoDataChange);this.D.T(this.player,"autonavchange",this.HV);this.D.T(this.player,"onAutonavCancelled",this.s5);this.onVideoDataChange()};
g.k.show=function(){F5.prototype.show.call(this);(this.L||this.C&&this.C!==this.videoData.clientPlaybackNonce)&&g.kS(this.player,!1);g.qS(this.player)&&this.HE()&&!this.C?(I5(this),this.videoData.autonavState===2?this.player.getVisibilityState()===3?this.j.select(!0):this.j.QC():this.videoData.autonavState===3&&this.j.Uy()):(g.kS(this.player,!0),I5(this));this.zD()};
g.k.hide=function(){F5.prototype.hide.call(this);this.j.Uy();I5(this)};
g.k.zD=function(){var a=this.player.hn(!0,this.player.isFullscreen());I5(this);E5(this.B);g.Bp(this.element,"ytp-autonav-cancelled-small-mode",this.fh(a));g.Bp(this.element,"ytp-autonav-cancelled-tiny-mode",this.kL(a));g.Bp(this.element,"ytp-autonav-cancelled-mini-mode",a.width<=400||a.height<=360);this.overlay&&g.Am(this.overlay.element,{width:a.width+"px"});if(!this.G)for(a=0;a<this.videos.length;a++)g.Bp(this.videos[a].element,"ytp-suggestion-card-with-margin",a%2===1)};
g.k.onVideoDataChange=function(){var a=this.player.getVideoData();if(this.videoData!==a&&a){this.videoData=a;if((a=this.videoData.suggestions)&&a.length||this.player.N("web_player_autonav_empty_suggestions_fix")){var b=g.kR(this.videoData);b&&(this.j.UI(b),this.j!==this.B&&this.B.UI(b))}if(a&&a.length)for(b=0;b<omb.length;++b){var c=omb[b];if(a&&a[c]){this.videos[b]=new C5(this.player);var d=this.videos[b];c=a[c];d.suggestion!==c&&(d.suggestion=c,B5(d,c));g.P(this,this.videos[b]);this.videos[b].Ha(this.W.element)}}this.zD()}};
g.k.HV=function(a){a===1?(this.L=!1,this.C=this.videoData.clientPlaybackNonce,this.j.gr(),this.Eb&&this.zD()):(this.L=!0,this.Mf()&&(a===2?this.j.QC():a===3&&this.j.Uy()))};
g.k.s5=function(a){a?this.HV(1):(this.C=null,this.L=!1)};
g.k.HE=function(){return this.videoData.autonavState!==1};
g.k.fh=function(a){return(a.width<910||a.height<459)&&!this.kL(a)&&!(a.width<=400||a.height<=360)};
g.k.kL=function(a){return a.width<800&&!(a.width<=400||a.height<=360)};
g.k.Mf=function(){return this.Eb&&g.qS(this.player)&&this.HE()&&!this.C};
var omb=[1,3,2,4];g.w(J5,g.S);g.k=J5.prototype;g.k.N2=function(){switch(this.buttonType){case 1:var a="Watch again on YouTube";var b=156915;break;case 2:a="Continue watching on YouTube";b=156942;break;default:a="Continue watching on YouTube",b=156942}this.update({content:a});this.K.hasVe(this.element)&&this.K.destroyVe(this.element);this.K.createClientVe(this.element,this,b)};
g.k.onClick=function(a){this.K.N("web_player_log_click_before_generating_ve_conversion_params")&&this.K.logClick(this.element);g.dT(this.getVideoUrl(),this.K,a);this.K.N("web_player_log_click_before_generating_ve_conversion_params")||this.K.logClick(this.element)};
g.k.getVideoUrl=function(){var a=!0;switch(this.buttonType){case 1:a=!0;break;case 2:a=!1}a=this.K.getVideoUrl(a,!1,!1,!0);var b=this.K.V();if(g.GP(b)){var c={};g.GP(b)&&g.WR(this.K,"addEmbedsConversionTrackingParams",[c]);a=g.bj(a,c)}return a};
g.k.logVisibility=function(){this.K.logVisibility(this.element,this.Eb&&this.U)};
g.k.show=function(){g.S.prototype.show.call(this);this.logVisibility()};
g.k.hide=function(){g.S.prototype.hide.call(this);this.logVisibility()};
g.k.yc=function(a){g.S.prototype.yc.call(this,a);this.logVisibility()};g.w(K5,F5);K5.prototype.show=function(){this.player.getPlayerState()!==3&&(F5.prototype.show.call(this),this.Ue.HC(!0),this.Ue.Zs(!0),this.K.V().He||this.Ue.Ys(!0),this.K.logVisibility(this.element,!0),this.watchButton.yc(!0))};
K5.prototype.hide=function(){F5.prototype.hide.call(this);this.Ue.HC(!1);this.Ue.Zs(!1);this.Ue.Ys(!1);this.K.logVisibility(this.element,!1);this.watchButton.yc(!1)};g.w(jmb,F5);jmb.prototype.Ta=function(){var a=this.player.getVideoData();this.j.update({profilePicture:a.profilePicture,author:a.author});this.subscribeButton.channelId=a.Bm;var b=this.subscribeButton;a.subscribed?b.j():b.B()};g.w(L5,g.S);L5.prototype.select=function(){this.api.Hp(this.suggestion.videoId,this.suggestion.sessionData,this.suggestion.playlistId,void 0,void 0,this.suggestion.qF||void 0)&&this.api.logClick(this.element)};
L5.prototype.onClick=function(a){if(g.GP(this.api.V())&&this.api.N("web_player_log_click_before_generating_ve_conversion_params")){this.api.logClick(this.element);var b=this.suggestion.Wl(),c={};g.HNa(this.api,c);b=g.bj(b,c);g.dT(b,this.api,a)}else g.cT(a,this.api,this.B,this.suggestion.sessionData||void 0)&&this.select()};
L5.prototype.onKeyPress=function(a){switch(a.keyCode){case 13:case 32:a.defaultPrevented||(this.select(),a.preventDefault())}};
L5.prototype.onVideoDataChange=function(){var a=this.api.getVideoData(),b=this.api.V();this.B=a.Of?!1:b.D};g.w(M5,F5);g.k=M5.prototype;g.k.create=function(){F5.prototype.create.call(this);var a=this.player.getVideoData();a&&(this.videoData=a);this.Er();this.B.T(this.player,"appresize",this.Er);this.B.T(this.player,"onVideoAreaChange",this.Er);this.B.T(this.player,"videodatachange",this.onVideoDataChange);this.B.T(this.player,"autonavchange",this.XN);this.B.T(this.player,"onAutonavCancelled",this.t5);a=this.videoData.autonavState;a!==this.Z&&this.XN(a);this.B.T(this.element,"transitionend",this.vda)};
g.k.destroy=function(){g.Us(this.B);g.lb(this.stills);this.stills=[];F5.prototype.destroy.call(this);g.zp(this.element,"ytp-show-tiles");this.L.stop();this.Z=this.videoData.autonavState};
g.k.HE=function(){return this.videoData.autonavState!==1};
g.k.show=function(){var a=this.Eb;F5.prototype.show.call(this);g.zp(this.element,"ytp-show-tiles");this.player.V().B?g.rp(this.L):this.L.start();(this.G||this.D&&this.D!==this.videoData.clientPlaybackNonce)&&g.kS(this.player,!1);N5(this)?(O5(this),this.videoData.autonavState===2?this.player.getVisibilityState()===3?this.j.select(!0):this.j.QC():this.videoData.autonavState===3&&this.j.Uy()):(g.kS(this.player,!0),O5(this));a!==this.Eb&&this.player.logVisibility(this.element,!0)};
g.k.hide=function(){var a=this.Eb;F5.prototype.hide.call(this);this.j.Uy();O5(this);a!==this.Eb&&this.player.logVisibility(this.element,!1)};
g.k.vda=function(a){a.target===this.element&&this.Er()};
g.k.Er=function(){var a,b,c,d;var e=((a=this.videoData)==null?0:(b=a.suggestions)==null?0:b.length)?(c=this.videoData)==null?void 0:c.suggestions:[(d=this.videoData)==null?void 0:g.kR(d)];if(e.length){g.xp(this.element,"ytp-endscreen-paginate");var f=this.K.hn(!0,this.K.isFullscreen());if(a=g.aS(this.K))a=a.Wh()?48:32,f.width-=a*2;var h=f.width/f.height;d=96/54;b=a=2;var l=Math.max(f.width/96,2),m=Math.max(f.height/54,2);c=e.length;var n=c*4;for(n-=4;n>0&&(a<l||b<m);){var p=a/2,q=b/2,r=a<=l-2&&n>=
q*4,t=b<=m-2&&n>=p*4;if((p+1)/q*d/h>h/(p/(q+1)*d)&&t)n-=p*4,b+=2;else if(r)n-=q*4,a+=2;else if(t)n-=p*4,b+=2;else break}d=!1;n>=12&&c*4-n<=6&&(b>=4||a>=4)&&(d=!0);n=a*96;l=b*54;h=n/l<h?f.height/l:f.width/n;h=Math.min(h,2);n=Math.floor(Math.min(f.width,n*h));l=Math.floor(Math.min(f.height,l*h));f=this.table.element;f.ariaLive="polite";g.Km(f,n,l);g.Am(f,{marginLeft:n/-2+"px",marginTop:l/-2+"px"});this.j.UI(g.kR(this.videoData));this.j instanceof D5&&E5(this.j);g.Bp(this.element,"ytp-endscreen-takeover",
N5(this));O5(this);n+=4;l+=4;h=0;f.ariaBusy="true";for(m=0;m<a;m++)for(p=0;p<b;p++)if(q=h,t=0,d&&m>=a-2&&p>=b-2?t=1:p%2===0&&m%2===0&&(p<2&&m<2?p===0&&m===0&&(t=2):t=2),q=g.xg(q+this.C,c),t!==0){r=this.stills[h];r||(r=new L5(this.player),this.stills[h]=r,f.appendChild(r.element));var u=Math.floor(l*p/b),y=Math.floor(n*m/a),A=Math.floor(l*(p+t)/b)-u-4,C=Math.floor(n*(m+t)/a)-y-4;g.Gm(r.element,y,u);g.Km(r.element,C,A);g.Am(r.element,"transitionDelay",(p+m)/20+"s");g.Bp(r.element,"ytp-videowall-still-mini",
t===1);g.Bp(r.element,"ytp-videowall-still-large",t>2);t=Math.max(C,A);g.Bp(r.element,"ytp-videowall-still-round-large",t>=256);g.Bp(r.element,"ytp-videowall-still-round-medium",t>96&&t<256);g.Bp(r.element,"ytp-videowall-still-round-small",t<=96);q=e[q];r.suggestion!==q&&(r.suggestion=q,t=r.api.V(),u=g.wp(r.element,"ytp-videowall-still-large")?"hqdefault.jpg":"mqdefault.jpg",B5(r,q,u),g.GP(t)&&!r.api.N("web_player_log_click_before_generating_ve_conversion_params")&&(t=q.Wl(),u={},g.WR(r.api,"addEmbedsConversionTrackingParams",
[u]),t=g.bj(t,u),r.updateValue("url",t)),(q=(q=q.sessionData)&&q.itct)&&r.api.setTrackingParams(r.element,q));h++}f.ariaBusy="false";g.Bp(this.element,"ytp-endscreen-paginate",h<c);for(e=this.stills.length-1;e>=h;e--)a=this.stills[e],g.qh(a.element),g.jb(a);this.stills.length=h}};
g.k.onVideoDataChange=function(){var a=this.player.getVideoData(1);this.videoData!==a&&(a!=null&&g.kR(a)?(this.C=0,this.videoData=a,this.Er()):this.player.oa("missg",{vid:(a==null?void 0:a.videoId)||"",cpn:(a==null?void 0:a.clientPlaybackNonce)||""}))};
g.k.u5=function(){this.C+=this.stills.length;this.Er()};
g.k.v5=function(){this.C-=this.stills.length;this.Er()};
g.k.x_=function(){return this.j.gm()};
g.k.XN=function(a){a===1?(this.G=!1,this.D=this.videoData.clientPlaybackNonce,this.j.gr(),this.Eb&&this.Er()):(this.G=!0,this.Eb&&N5(this)&&(a===2?this.j.QC():a===3&&this.j.Uy()))};
g.k.t5=function(a){if(a){for(a=0;a<this.stills.length;a++)this.K.logVisibility(this.stills[a].element,!0);this.XN(1)}else this.D=null,this.G=!1;this.Er()};
g.k.Mf=function(){return this.Eb&&N5(this)};g.w(P5,F5);P5.prototype.show=function(){if(this.player.getPlayerState()!==3){F5.prototype.show.call(this);var a=this.B;if(a){var b=this.j.suggestionData.length>0;g.Bp(this.element,"ytp-shorts-branded-ui",b);b?a.show():a.hide()}var c;(c=g.aS(this.player))==null||c.IC(!0);this.player.logVisibility(this.element,!0);this.watchButton.yc(!0)}};
P5.prototype.hide=function(){F5.prototype.hide.call(this);var a;(a=g.aS(this.player))==null||a.IC(!1);this.player.logVisibility(this.element,!1);this.watchButton.yc(!1)};g.w(nmb,g.fY);g.k=nmb.prototype;g.k.Nv=function(){var a=this.player.getVideoData(),b=a.mutedAutoplay;if((this.player.jd()||this.B)&&!b)return!0;var c;var d=!!((a==null?0:g.kR(a))||(a==null?0:(c=a.suggestions)==null?0:c.length));d=!kmb(this.player)||d;a=a.ek;c=this.player.DF();return d&&!a&&!c&&!b};
g.k.Mf=function(){return this.endScreen.Mf()};
g.k.T$=function(){return this.Mf()?this.endScreen.x_():!1};
g.k.xa=function(){this.player.bf("endscreen");g.fY.prototype.xa.call(this)};
g.k.load=function(){var a=this.player.getVideoData();var b=a.transitionEndpointAtEndOfStream;if(b&&b.videoId){var c=this.player.Bb().Pe.get("heartbeat"),d=g.kR(a);!d||b.videoId!==d.videoId||a.nX?(this.player.Hp(b.videoId,void 0,void 0,!0,!0,b),c&&c.xL("HEARTBEAT_ACTION_TRIGGER_AT_STREAM_END","HEARTBEAT_ACTION_TRANSITION_REASON_HAS_NEW_STREAM_TRANSITION_ENDPOINT"),a=!0):a=!1}else a=!1;a||(g.fY.prototype.load.call(this),this.endScreen.show())};
g.k.unload=function(){g.fY.prototype.unload.call(this);this.endScreen.hide();this.endScreen.destroy()};
g.k.onCueRangeEnter=function(a){this.Nv()&&(this.endScreen.created||this.endScreen.create(),a.getId()==="load"&&this.load())};
g.k.onCueRangeExit=function(a){a.getId()==="load"&&this.loaded&&this.unload()};
g.k.onVideoDataChange=function(){mmb(this);this.D&&lmb(this)&&(this.endScreen&&(this.endScreen.hide(),this.endScreen.created&&this.endScreen.destroy(),this.endScreen.dispose()),this.j?this.endScreen=new H5(this.player):this.endScreen=new M5(this.player),g.P(this,this.endScreen),g.pS(this.player,this.endScreen.element,4))};g.eY("endscreen",nmb);})(_yt_player);
