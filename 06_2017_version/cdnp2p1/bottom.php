		<hr/>
		<?php
		if(file_exists("hits.txt"))
		{
			$HITS=file_get_contents("hits.txt");
		}
		else
		{
			$HITS=0;
		}
		$HITS++;
		file_put_contents("hits.txt",$HITS);
		?>
		<p>You are the <?= $HITS ?>th vistors</p>
		<p>
		Version 1.00 Copyright &copy; 2014 Junbo
		</p>
	</body>
</html>