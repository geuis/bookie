var bookieobj={

	cssarr:[],
	buildstyle:function(cssarr){

		var o = '';
		for(i in cssarr){ 
			o+= cssarr[i];
		}
 
		var f = document.createDocumentFragment();
		var s = document.createElement('style');
		s.type='text/css';
		s.id='bookieEditorCSS';
		f.appendChild(s);
		
		if(s.styleSheet){
			s.styleSheet.cssText = o;
		}else{
			s.appendChild( document.createTextNode(o) );
		}
		
		document.getElementsByTagName('head')[0].appendChild(f);
	},

	init:function(){
		var c=document.cookie.split(';');
		
		var cArr=[];
		for(var i in c){
			d=c[i].split('=');
			
			if(d[1]!=undefined){
				cArr[d[0].replace(' ','')]=d[1];
			}
		}
	
		var dfrag=document.createDocumentFragment();
		var ul=document.createElement('ul');
		ul.id='bookieEditorView';
		var li=document.createElement('li');
		var anchor=document.createElement('a');
	
		for(var i in cArr){
			ul.appendChild(li.cloneNode(false));
			ul.lastChild.id='bookie'+i;
			ul.lastChild.appendChild(anchor.cloneNode(true));
			ul.lastChild.lastChild.id='bookieAnchor'+i;
			ul.lastChild.lastChild.val=i;
			ul.lastChild.lastChild.href='#';
			ul.lastChild.lastChild.onclick=function(){

				document.cookie=this.val+'=remove;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/';
				var node=document.getElementById('bookie'+this.val);
				node.parentNode.removeChild(node);
			};
			
			ul.lastChild.lastChild.innerHTML='<div class="left">'+i.split('').join('&shy;') +':</div><div class="right">'+cArr[i].split('').join('&shy;')+'</div>';
		}

		var disp=document.createElement('div');
		disp.id="bookieEditorID";
		disp.appendChild(ul);
		dfrag.appendChild(disp);
	
		bookieobj.cssarr.push(
			"#bookieEditorID{position:absolute;z-index:1000000;left:0px;top:0px;background-color:#6c6c6c;width:auto;padding:5px 10px 5px 5px;line-height:20px;font-family:arial;font-size:13px;}",
			"#bookieEditorID ul{padding:0;margin:0;list-style:none;}",
			"#bookieEditorID li{ overflow:hidden;border-bottom:1px solid #ccc;}",
			"#bookieEditorID li:hover{ background-color:#949494;}",
			"#bookieEditorID a, #bookieEditorID a *{color:#eeeeee;font-weight:bold;text-decoration:none;}",
			"#bookieEditorID .left{float:left;width:100px;text-align:right;}",
			"#bookieEditorID .right{float:left;text-align:left;padding:0 0 0 5px;}"
		);
		
		bookieobj.buildstyle(bookieobj.cssarr);
		document.getElementsByTagName('body')[0].appendChild(dfrag);
	}
}
bookieobj.init();
