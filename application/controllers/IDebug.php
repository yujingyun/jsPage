<?php

/**
 * Created by PhpStorm.
 * User: yjy
 * Date: 16/2/20
 * Time: 上午9:57
 */
defined('BASEPATH') OR exit('No direct script access allowed');

class IDebug extends CI_Controller
{
    public function __construct()
    {
        parent::__construct();
    }


    /**
     * 默认方法
     */
    public function index()
    {
        $this->load->view('idebug/debug');

    }
}