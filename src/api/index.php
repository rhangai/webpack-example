<?php
namespace keeplives\api;

require_once dirname( __DIR__ ).'/main.php';

class API extends \LibWeb\API {

	public function formatResponse( $status, $data, $errorType, $req, $res ) {
		return array(
			"status" => $status,
			"data"   => parent::formatResponse( $status, $data, $errorType, $req, $res ),
		);
	}
}

setlocale( LC_ALL, "pt_BR" );

$api = new API( "honest\\api", __DIR__ );
$api->addIgnore( __FILE__ );
$api->dispatch( "/api/" );