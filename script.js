let index = 0;
let attempt =0;
let score =0;
let wrong =0;
let j=0;
let questions = quiz.sort(function(){
  return 0.5 - Math.random();
});

$(function(){
	let totaltime = 120;
	let min = 0;
	let sec = 0;
	let counter = 0;

	let timer = setInterval(function (){
		counter++;
		min = Math.floor((totaltime - counter) / 60);
		sec = totaltime - min * 60 - counter;
		console.log("min="+min); console.log("sec="+sec);
		$(".timebox span").text(min + ":"+ sec);
		if(counter == totaltime)
		{
			alert("Time up . press ok to show result");
			resultshow();
			clearInterval(timer);
		}
	},1000);
	printquestion(index);
});

function printquestion(i){
	$(".questionbox").text(questions[i].question);
	$(".optionbox span").eq(0).text(questions[i].option[0]);
	$(".optionbox span").eq(1).text(questions[i].option[1]);
	$(".optionbox span").eq(2).text(questions[i].option[2]);
	$(".optionbox span").eq(3).text(questions[i].option[3]);
}

function checkanswer(option){
	attempt++;
	let optionclicked = $(option).data("oppt");

	if(optionclicked == questions[index].answer){
		$(option).addClass("right");
		score++;
	}
	else
	{
		$(option).addClass("wrong");
		wrong++;
	}

	$(".scorebox span").text(score);

    $(".optionbox span").attr("onclick","")//single point;
}

function showNext(){
j++;
	if(j==10)
	{
		resultshow()
	}
	if(index >= (questions.length-1))
	{
		showResult(0);
		return;
	}

	index++;
	$(".optionbox span").removeClass();
	$(".optionbox span").attr("onclick","checkanswer(this)");
	printquestion(index);
}

function showresult(j){
	if(j==1 && index<questions.length-1 && !confirm("Quiz has not finished yet. press ok skip & get you final result.scorebox"))
	{
		return;
	}
	resultshow()
}

function resultshow()
{
	$("#questionscreen").hide();
	$("#resultscreen").show();

	$("#totalquestion").text();
	$("#attemptquestion").text(attempt);
	$("#correctanswer").text(score);
	$("#wronganswer").text(wrong);
}
